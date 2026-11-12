export type OrbWavePointer = { u: number; v: number; active: number; speed: number; pressed?: boolean };

/** A damped wave surface. RG stores height in [-.4,.4] at 16-bit precision. */
export class OrbWaveField {
  readonly size = 128;
  readonly pixels = new Uint8Array(this.size * this.size * 4);

  private height = new Float32Array(this.size * this.size);
  private nextHeight = new Float32Array(this.size * this.size);
  private velocity = new Float32Array(this.size * this.size);
  private force = new Float32Array(this.size * this.size);
  private modeA = new Float32Array(this.size * this.size);
  private modeB = new Float32Array(this.size * this.size);
  private accumulator = 0;
  private previousU = 0.5;
  private previousV = 0.5;
  private previousActive = 0;
  private active = 0;
  private speed = 0;

  constructor() {
    const n = this.size;
    for (let y = 0; y < n; y++) {
      const a = Math.cos(y / (n - 1) * Math.PI);
      const b = Math.cos(y / (n - 1) * Math.PI * 2);
      for (let x = 0; x < n; x++) {
        this.modeA[y * n + x] = Math.sin(x / n * Math.PI * 2) * a;
        this.modeB[y * n + x] = Math.cos(x / n * Math.PI * 4) * b;
      }
    }
    this.reset();
  }

  reset(): void {
    this.height.fill(0);
    this.nextHeight.fill(0);
    this.velocity.fill(0);
    this.force.fill(0);
    this.accumulator = 0;
    this.previousU = this.previousV = 0.5;
    this.previousActive = this.active = this.speed = 0;
    this.encode();
  }

  step(dtSeconds: number, pointer: OrbWavePointer, time: number): void {
    if (!Number.isFinite(dtSeconds) || dtSeconds <= 0) return;
    const dt = Math.min(dtSeconds, 1 / 15);
    const fixedDt = 1 / 120;
    this.accumulator = Math.min(this.accumulator + dt, 8 * fixedDt);
    const steps = Math.floor((this.accumulator + 1e-9) / fixedDt);
    if (!steps) return;
    this.accumulator -= steps * fixedDt;

    const u = Number.isFinite(pointer.u) ? ((pointer.u % 1) + 1) % 1 : this.previousU;
    const v = Number.isFinite(pointer.v) ? Math.max(0, Math.min(1, pointer.v)) : this.previousV;
    const active = Number.isFinite(pointer.active) ? Math.max(0, Math.min(1, pointer.active)) : 0;
    const speed = Number.isFinite(pointer.speed) ? Math.max(0, Math.min(4, pointer.speed)) : 0;
    this.active += (active - this.active) * (1 - Math.exp(-dt * 16));
    this.speed += (speed - this.speed) * (1 - Math.exp(-dt * 10));
    this.force.fill(0);

    const phase = Number.isFinite(time) ? time : 0;
    if (this.active > 0.0001) {
      const breath = 1 + 0.14 * Math.sin(phase * 5.1) + 0.06 * Math.sin(phase * 8.3);
      const motion = Math.min(1, this.speed / 1.3);
      const radius = 7 + motion * 2;
      const strength = this.active * (4 * breath + motion * 13.5) * (pointer.pressed ? -1 : 1);
      let du = u - this.previousU;
      if (du > 0.5) du -= 1;
      if (du < -0.5) du += 1;
      const dv = v - this.previousV;
      const distance = this.previousActive > 0.001 ? Math.hypot(du, dv) * this.size : 0;
      const stamps = Math.min(24, Math.max(1, Math.ceil(distance / (radius * 0.6))));
      // Keep a continuous wake even when input points arrive far apart.
      const wake = motion * 0.55;
      this.splat(u * this.size, v * (this.size - 1), radius, strength * (1 - wake));
      for (let stamp = 0; stamp < stamps; stamp++) {
        const t = (stamp + 1) / stamps;
        this.splat((this.previousActive > 0.001 ? this.previousU + du * t : u) * this.size,
          (this.previousActive > 0.001 ? this.previousV + dv * t : v) * (this.size - 1),
          radius, strength * wake / stamps);
      }
    }
    this.previousU = u;
    this.previousV = v;
    this.previousActive = active;

    const n = this.size;
    const waveSpeedSquared = 46 * 46;
    const velocityDamping = Math.exp(-2.4 * fixedDt);
    const heightDamping = Math.exp(-0.08 * fixedDt);
    const restore = 12;
    const backgroundA = Math.sin(phase * 0.67) * 0.08;
    const backgroundB = Math.cos(phase * 0.43) * 0.06;
    const velocity = this.velocity, force = this.force, modeA = this.modeA, modeB = this.modeB;
    for (let step = 0; step < steps; step++) {
      const h = this.height, next = this.nextHeight;
      for (let y = 0; y < n; y++) {
        const row = y * n, up = y > 0 ? row - n : row, down = y < n - 1 ? row + n : row;
        for (let x = 0; x < n; x++) {
          const i = row + x;
          const left = x > 0 ? i - 1 : i + n - 1;
          const right = x < n - 1 ? i + 1 : i - n + 1;
          const laplacian = h[left] + h[right] + h[up + x] + h[down + x] - 4 * h[i];
          let speed = (velocity[i] + (waveSpeedSquared * laplacian - restore * h[i]
            + force[i] + modeA[i] * backgroundA + modeB[i] * backgroundB) * fixedDt) * velocityDamping;
          let value = (h[i] + speed * fixedDt) * heightDamping;
          if (value > 0.3) { value = 0.3; speed = Math.min(speed, 0); }
          else if (value < -0.3) { value = -0.3; speed = Math.max(speed, 0); }
          next[i] = value;
          velocity[i] = speed;
        }
      }
      this.height = next;
      this.nextHeight = h;
    }
    this.encode();
  }

  sample(u: number, v: number): number {
    if (!Number.isFinite(u) || !Number.isFinite(v)) return 0;
    const n = this.size, x = ((u % 1) + 1) % 1 * n, y = Math.max(0, Math.min(1, v)) * (n - 1);
    const x0 = Math.floor(x), y0 = Math.floor(y), x1 = (x0 + 1) % n, y1 = Math.min(n - 1, y0 + 1);
    const fx = x - x0, fy = y - y0, h = this.height;
    const a = h[y0 * n + x0] * (1 - fx) + h[y0 * n + x1] * fx;
    const b = h[y1 * n + x0] * (1 - fx) + h[y1 * n + x1] * fx;
    return a * (1 - fy) + b * fy;
  }

  private splat(cx: number, cy: number, radius: number, strength: number): void {
    if (strength === 0) return;
    const n = this.size, force = this.force, inverseRadiusSquared = 1 / (radius * radius);
    const minX = Math.floor(cx - radius), maxX = Math.ceil(cx + radius);
    const minY = Math.max(0, Math.floor(cy - radius)), maxY = Math.min(n - 1, Math.ceil(cy + radius));
    for (let y = minY; y <= maxY; y++) {
      const dy = y - cy, row = y * n;
      for (let x = minX; x <= maxX; x++) {
        const dx = x - cx, r2 = (dx * dx + dy * dy) * inverseRadiusSquared;
        if (r2 >= 1) continue;
        const soft = 1 - r2;
        const wrappedX = (x % n + n) % n;
        force[row + wrappedX] += strength * soft * soft * soft;
      }
    }
  }

  private encode(): void {
    const h = this.height, velocity = this.velocity, pixels = this.pixels;
    for (let i = 0, offset = 0; i < h.length; i++, offset += 4) {
      const encoded = Math.max(0, Math.min(65535, Math.round((h[i] + 0.4) * (65535 / 0.8))));
      pixels[offset] = encoded >>> 8;
      pixels[offset + 1] = encoded & 255;
      pixels[offset + 2] = Math.max(0, Math.min(255, Math.round(128 + velocity[i] * 64)));
      pixels[offset + 3] = 255;
    }
  }
}
