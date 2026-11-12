'use client';

import { useEffect, useRef } from 'react';
import { OrbWaveField } from './orb-wave-field';

const noiseSource = `
float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float noise3(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash31(i), hash31(i + vec3(1,0,0)), f.x),
                 mix(hash31(i + vec3(0,1,0)), hash31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash31(i + vec3(0,0,1)), hash31(i + vec3(1,0,1)), f.x),
                 mix(hash31(i + vec3(0,1,1)), hash31(i + vec3(1,1,1)), f.x), f.y), f.z);
}`;

const vertexSource = `
precision highp float;
attribute vec3 a_position;
attribute vec2 a_uv;
uniform sampler2D u_field;
uniform vec2 u_texel;
uniform vec2 u_drag;
uniform vec2 u_float;
uniform vec2 u_pointer;
uniform float u_hover;
uniform float u_time;
varying vec2 v_uv;
varying vec3 v_direction;
varying vec3 v_normal;

float heightAt(vec2 uv) {
  return dot(texture2D(u_field, uv).rg, vec2(256.0, 1.0)) / 257.0 * 0.8 - 0.4;
}
vec3 directionAt(vec2 uv) {
  float latitude = (1.0 - uv.y) * 3.14159265;
  float longitude = uv.x * 3.14159265;
  return vec3(-sin(latitude) * cos(longitude), cos(latitude), sin(latitude) * sin(longitude));
}
vec3 surface(vec2 uv) {
  vec3 direction = directionAt(uv);
  // All longitudes meet at each pole; keep the displaced cap continuous there.
  float height = heightAt(uv) * smoothstep(0.0, 0.1, length(direction.xz));
  float angle = atan(direction.y, direction.x + 0.00001);
  float contour = length(direction.xy);
  float breathing = sin(u_time * 0.6) * 0.003;
  float organic = (sin(angle * 3.0 + u_time * 0.35) * 0.007
    + sin(angle * 2.0 - u_time * 0.27) * 0.004) * contour;
  vec2 contact = direction.xy * 0.825 - (u_pointer - u_float);
  float hoverPull = u_hover * exp(-dot(contact, contact) * 4.5) * 0.024;
  float radius = 0.825 + height * 0.66 + breathing + organic + hoverPull;
  vec3 p = direction * radius;
  // The body stretches along the hover force, and keeps its volume across it.
  float dragLength = length(u_drag);
  vec2 axis = u_drag / max(dragLength, 0.0001);
  vec2 across = vec2(-axis.y, axis.x);
  float strain = min(dragLength * 0.65, 0.065);
  p.xy += axis * dot(p.xy, axis) * strain;
  p.xy -= across * dot(p.xy, across) * strain * 0.55;
  p.xy += u_drag * (0.24 + direction.z * 0.2) + u_float;
  p.x += direction.y * u_drag.x * 0.18;
  p.y += direction.x * u_drag.y * 0.18;
  return p;
}
void main() {
  vec3 p = surface(a_uv);
  vec3 du = surface(a_uv + vec2(u_texel.x * 0.45, 0.0)) - p;
  vec3 dv = surface(a_uv + vec2(0.0, u_texel.y * 0.45)) - p;
  v_uv = a_uv;
  v_direction = a_position;
  v_normal = normalize(cross(du, dv));
  gl_Position = vec4(p.xy, -p.z * 0.5, 1.0);
}`;

const fragmentSource = `
precision highp float;
uniform sampler2D u_field;
uniform vec2 u_texel;
uniform vec2 u_drag;
uniform vec2 u_pointer;
uniform float u_hover;
uniform float u_energy;
uniform float u_time;
uniform float u_pixel;
uniform vec3 u_purple;
uniform vec3 u_lilac;
uniform vec3 u_white;
uniform vec3 u_shadow;
varying vec2 v_uv;
varying vec3 v_direction;
varying vec3 v_normal;
${noiseSource}

float heightAt(vec2 uv) {
  return dot(texture2D(u_field, uv).rg, vec2(256.0, 1.0)) / 257.0 * 0.8 - 0.4;
}
vec3 overlayLight(vec3 color, float light) {
  vec3 low = color * (2.0 * light);
  vec3 high = 1.0 - (1.0 - color) * (2.0 * (1.0 - light));
  return mix(low, high, step(vec3(0.5), color));
}
void main() {
  float dx = heightAt(v_uv + vec2(u_texel.x, 0.0)) - heightAt(v_uv - vec2(u_texel.x, 0.0));
  float dy = heightAt(v_uv + vec2(0.0, u_texel.y)) - heightAt(v_uv - vec2(0.0, u_texel.y));
  vec2 slope = vec2(dx, dy) / (2.0 * u_texel);
  vec3 waveNormal = normalize(vec3(-slope * 0.82, 1.0));
  float roll = sin(u_time * 0.34) * 0.27 + u_drag.x * 1.6 - u_drag.y * 0.9;
  roll += u_pointer.x * u_hover * 0.035;
  mat2 rotation = mat2(cos(roll), -sin(roll), sin(roll), cos(roll));
  vec2 palette = rotation * ((v_uv - 0.5) * 2.0);
  palette += clamp(slope, vec2(-2.0), vec2(2.0)) * 0.065;
  float cloud = noise3(vec3(palette * 2.0, u_time * 0.06)) - 0.5;

  // LUDOVIK palette: principal purple, supporting lilac, brand white and deep black.
  vec3 amethyst = u_purple;
  vec3 pearl = mix(u_lilac, u_white, 0.15);
  vec3 deepViolet = mix(u_purple, u_shadow, 0.37);
  float lightSide = smoothstep(-0.3, 0.85, palette.y + palette.x * 0.55 + cloud * 0.12);
  vec3 color = mix(amethyst, u_lilac, lightSide * 0.74);
  float pearlLight = smoothstep(0.25, 1.1, palette.y + palette.x * 0.85);
  color = mix(color, u_white, pearlLight * 0.7);
  float shadowSide = smoothstep(0.15, 1.0, -palette.y - palette.x * 0.5);
  color = mix(color, deepViolet, shadowSide * 0.6);
  float rim = pow(1.0 - max(normalize(v_direction).z, 0.0), 2.0);
  vec3 rimColor = mix(u_purple, pearl, smoothstep(-0.3, 0.7, palette.x + palette.y * 0.5));
  color = mix(color, rimColor, rim * 0.55);

  // Illumination comes from the travelling heightfield gradients, with no painted crater.
  float lightAngle = 1.1 + sin(u_time * 0.38) * 0.8 + u_drag.x * 2.0;
  vec3 lightDirection = normalize(vec3(cos(lightAngle) * 0.85, sin(lightAngle) * 0.85, 1.0));
  float diffuse = max(dot(waveNormal, lightDirection), 0.0);
  float illumination = clamp(0.54 + (diffuse - lightDirection.z) * 1.45, 0.12, 0.98);
  color = mix(color, overlayLight(color, illumination), 0.88);
  vec3 halfLight = normalize(lightDirection + vec3(0.0, 0.0, 1.0));
  float reflection = pow(max(dot(waveNormal, halfLight), 0.0), 26.0);
  color += u_white * reflection * (0.045 + u_energy * 0.015);
  float grain = hash31(vec3(gl_FragCoord.xy, 4.7)) - 0.5;
  color += grain * 0.004;
  float alpha = smoothstep(0.0, sqrt(u_pixel) * 0.65, max(normalize(v_direction).z, 0.0));
  gl_FragColor = vec4(color * alpha, alpha);
}`;

function createSphere() {
  const latitudes = 96, longitudes = 144;
  const vertices = new Float32Array((latitudes + 1) * (longitudes + 1) * 5);
  const indices = new Uint16Array(latitudes * longitudes * 6);
  let vertex = 0, index = 0;
  for (let lat = 0; lat <= latitudes; lat++) {
    const theta = lat / latitudes * Math.PI;
    for (let lon = 0; lon <= longitudes; lon++) {
      const phi = lon / longitudes * Math.PI;
      vertices[vertex++] = -Math.sin(theta) * Math.cos(phi);
      vertices[vertex++] = Math.cos(theta);
      vertices[vertex++] = Math.sin(theta) * Math.sin(phi);
      vertices[vertex++] = lon / longitudes;
      vertices[vertex++] = 1 - lat / latitudes;
    }
  }
  for (let lat = 0; lat < latitudes; lat++) {
    for (let lon = 0; lon < longitudes; lon++) {
      const a = lat * (longitudes + 1) + lon, b = a + longitudes + 1;
      indices.set([a, b, a + 1, a + 1, b, b + 1], index);
      index += 6;
    }
  }
  return { vertices, indices };
}

export function HeroAmoeba() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    const canvas = element?.querySelector('canvas');
    const hero = element?.closest('section');
    if (!element || !canvas || !hero) return;

    const gl = canvas.getContext('webgl', {
      alpha: true, antialias: true, depth: true, stencil: false,
      premultipliedAlpha: true, powerPreference: 'low-power',
    });
    if (!gl) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let motionReduced = reducedMotion.matches;
    let pointerFine = finePointer.matches;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let indexBuffer: WebGLBuffer | null = null;
    let indexCount = 0;
    let fieldTexture: WebGLTexture | null = null;
    const waveField = new OrbWaveField();
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    let frame = 0;
    let visible = false;
    let disposed = false;
    let lastTime = 0;
    let elapsed = 0;
    let bounds = element.getBoundingClientRect();
    const target = { x: 0, y: 0, hover: 0, energy: 0 };
    const current = { x: 0, y: 0, hover: 0, energy: 0 };
    const body = { x: 0, y: 0, vx: 0, vy: 0 };
    const drift = { x: 0, y: 0 };
    let previousX = 0, previousY = 0;
    const wavePointer = { u: 0.5, v: 0.5, active: 0, speed: 0, pressed: false };
    let pointerPressed = false;

    function release() {
      cancelAnimationFrame(frame);
      frame = 0;
      gl!.deleteBuffer(buffer);
      gl!.deleteBuffer(indexBuffer);
      gl!.deleteTexture(fieldTexture);
      gl!.deleteProgram(program);
      buffer = null;
      indexBuffer = null;
      fieldTexture = null;
      program = null;
      delete element!.dataset.renderer;
    }

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) return shader;
      gl!.deleteShader(shader);
      return null;
    }

    function draw() {
      if (!program || gl!.isContextLost()) return;
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, fieldTexture);
      gl!.texSubImage2D(gl!.TEXTURE_2D, 0, 0, 0, waveField.size, waveField.size, gl!.RGBA, gl!.UNSIGNED_BYTE, waveField.pixels);
      gl!.uniform2f(uniforms.u_drag, body.x, body.y);
      gl!.uniform2f(uniforms.u_float, drift.x, drift.y);
      gl!.uniform1f(uniforms.u_time, elapsed);
      gl!.uniform1f(uniforms.u_pixel, 2 / canvas!.width);
      gl!.uniform2f(uniforms.u_pointer, current.x, current.y);
      gl!.uniform1f(uniforms.u_hover, current.hover);
      gl!.uniform1f(uniforms.u_energy, current.energy);
      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
      gl!.drawElements(gl!.TRIANGLES, indexCount, gl!.UNSIGNED_SHORT, 0);
      if (element!.dataset.renderer !== 'webgl') element!.dataset.renderer = 'webgl';
    }

    function resize() {
      bounds = element!.getBoundingClientRect();
      const resolution = Math.min(1024, Math.round(bounds.width * Math.min(window.devicePixelRatio || 1, 1.5)));
      canvas!.width = canvas!.height = Math.max(1, resolution);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      draw();
    }

    function tick(now: number) {
      frame = 0;
      if (disposed || !visible || document.hidden || motionReduced || !program) return;
      const dt = Math.min((now - lastTime) / 1000 || 0, 0.05);
      // Touch devices render at 30 fps and leave native gestures untouched.
      if (!pointerFine && now - lastTime < 32) {
        frame = requestAnimationFrame(tick);
        return;
      }
      lastTime = now;
      elapsed += dt;
      drift.x = Math.sin(elapsed * 0.55) * 0.012;
      drift.y = Math.sin(elapsed * 0.43) * 0.023;
      const ease = 1 - Math.exp(-dt * 5.5);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.hover += (target.hover - current.hover) * ease;
      current.energy += (target.energy - current.energy) * ease;
      const vx = Math.max(-4, Math.min(4, (target.x - previousX) / Math.max(dt, 0.001)));
      const vy = Math.max(-4, Math.min(4, (target.y - previousY) / Math.max(dt, 0.001)));
      previousX = target.x;
      previousY = target.y;
      const pullX = (current.x * 0.065 + vx * 0.025) * current.hover;
      const pullY = (current.y * 0.065 + vy * 0.025) * current.hover;
      const pullLimit = Math.min(1, 0.1 / Math.max(0.0001, Math.hypot(pullX, pullY)));
      // Sustained hover deforms the body too; velocity gives it a short viscous wake.
      body.vx += ((pullX * pullLimit - body.x) * 36 - body.vx * 8.5) * dt;
      body.vy += ((pullY * pullLimit - body.y) * 36 - body.vy * 8.5) * dt;
      body.x += body.vx * dt;
      body.y += body.vy * dt;
      const sx = Math.max(-0.995, Math.min(0.995, (current.x - drift.x - body.x * 0.44) / 0.825));
      const sy = Math.max(-0.995, Math.min(0.995, (current.y - drift.y - body.y * 0.44) / 0.825));
      const distance = sx * sx + sy * sy;
      const z = Math.sqrt(Math.max(0.0001, 1 - distance));
      const nextU = Math.atan2(z, -sx) / Math.PI;
      const nextV = 1 - Math.acos(sy) / Math.PI;
      const surfaceSpeed = Math.hypot(nextU - wavePointer.u, nextV - wavePointer.v) / Math.max(dt, 0.001);
      wavePointer.u = nextU;
      wavePointer.v = nextV;
      wavePointer.active = distance < 1 ? current.hover : 0;
      wavePointer.speed = wavePointer.active > 0.01 ? Math.min(4, surfaceSpeed) : 0;
      wavePointer.pressed = pointerPressed;
      waveField.step(dt, wavePointer, elapsed);
      target.energy *= Math.exp(-dt * 5);
      draw();
      frame = requestAnimationFrame(tick);
    }

    function syncPlayback() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (motionReduced) {
        Object.assign(target, { x: 0, y: 0, hover: 0, energy: 0 });
        Object.assign(current, target);
        elapsed = 0;
        waveField.reset();
        Object.assign(body, { x: 0, y: 0, vx: 0, vy: 0 });
        drift.x = drift.y = 0;
        previousX = previousY = 0;
        pointerPressed = false;
        draw();
      } else if (visible && !document.hidden && program) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }

    function initialize() {
      const vertex = compile(gl!.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl!.FRAGMENT_SHADER, fragmentSource);
      if (!vertex || !fragment) {
        if (vertex) gl!.deleteShader(vertex);
        if (fragment) gl!.deleteShader(fragment);
        return;
      }
      program = gl!.createProgram();
      if (program) {
        gl!.attachShader(program, vertex);
        gl!.attachShader(program, fragment);
        gl!.linkProgram(program);
      }
      gl!.deleteShader(vertex);
      gl!.deleteShader(fragment);
      if (!program || !gl!.getProgramParameter(program, gl!.LINK_STATUS)) { release(); return; }
      gl!.useProgram(program);
      const sphere = createSphere();
      buffer = gl!.createBuffer();
      indexBuffer = gl!.createBuffer();
      if (!buffer || !indexBuffer) { release(); return; }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, sphere.vertices, gl!.STATIC_DRAW);
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl!.bufferData(gl!.ELEMENT_ARRAY_BUFFER, sphere.indices, gl!.STATIC_DRAW);
      indexCount = sphere.indices.length;
      const position = gl!.getAttribLocation(program, 'a_position');
      gl!.enableVertexAttribArray(position);
      gl!.vertexAttribPointer(position, 3, gl!.FLOAT, false, 20, 0);
      const uv = gl!.getAttribLocation(program, 'a_uv');
      gl!.enableVertexAttribArray(uv);
      gl!.vertexAttribPointer(uv, 2, gl!.FLOAT, false, 20, 12);
      gl!.enable(gl!.DEPTH_TEST);
      gl!.enable(gl!.CULL_FACE);
      gl!.cullFace(gl!.BACK);
      uniforms = Object.fromEntries(['u_time', 'u_pixel', 'u_pointer', 'u_hover', 'u_energy', 'u_purple', 'u_lilac', 'u_white', 'u_shadow', 'u_field', 'u_texel', 'u_drag', 'u_float']
        .map(name => [name, gl!.getUniformLocation(program!, name)]));
      // Read the actual brand tokens, including custom properties that reference other tokens.
      const color = (token: string) => {
        const probe = document.createElement('span');
        probe.style.color = `var(${token})`;
        probe.style.display = 'none';
        element!.appendChild(probe);
        const rgb = getComputedStyle(probe).color.match(/[\d.]+/g)?.slice(0, 3).map(value => Number(value) / 255);
        probe.remove();
        return rgb && rgb.length === 3 ? rgb : [0.65, 0.24, 1];
      };
      fieldTexture = gl!.createTexture();
      if (!fieldTexture) { release(); return; }
      gl!.activeTexture(gl!.TEXTURE0);
      gl!.bindTexture(gl!.TEXTURE_2D, fieldTexture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.REPEAT);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, waveField.size, waveField.size, 0, gl!.RGBA, gl!.UNSIGNED_BYTE, waveField.pixels);
      gl!.uniform1i(uniforms.u_field, 0);
      gl!.uniform2f(uniforms.u_texel, 1 / waveField.size, 1 / waveField.size);
      gl!.uniform3fv(uniforms.u_purple, color('--purple'));
      gl!.uniform3fv(uniforms.u_lilac, color('--amoeba-lilac'));
      gl!.uniform3fv(uniforms.u_white, color('--text'));
      gl!.uniform3fv(uniforms.u_shadow, color('--bg'));
      gl!.clearColor(0, 0, 0, 0);
      resize();
      syncPlayback();
    }

    function pointerMove(event: PointerEvent) {
      if (!pointerFine || motionReduced || event.pointerType === 'touch') return;
      bounds = element!.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      const y = 1 - (event.clientY - bounds.top) / bounds.height * 2;
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      const nextX = clamp(x), nextY = clamp(y);
      target.energy = Math.min(1, target.energy + Math.hypot(nextX - target.x, nextY - target.y) * 1.8);
      target.x = nextX;
      target.y = nextY;
      target.hover = Math.max(0, Math.min(1, (0.86 - Math.hypot(x, y)) / 0.07));
    }

    function resetPointer() { target.hover = 0; target.energy = 0; pointerPressed = false; }
    function pointerDown(event: PointerEvent) {
      if (!pointerFine || motionReduced || event.pointerType !== 'mouse' || target.hover < 0.1) return;
      if (event.target instanceof Element && event.target.closest('a, button, summary')) return;
      pointerPressed = true;
    }
    function pointerUp() { pointerPressed = false; }
    function motionPreferenceChanged(event: MediaQueryListEvent) {
      motionReduced = event.matches;
      syncPlayback();
    }
    function pointerPreferenceChanged(event: MediaQueryListEvent) {
      pointerFine = event.matches;
      resetPointer();
    }
    function refreshBounds() { bounds = element!.getBoundingClientRect(); }
    function contextLost(event: Event) { event.preventDefault(); release(); }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refreshBounds();
      syncPlayback();
    });
    const resizeObserver = new ResizeObserver(resize);
    initialize();
    observer.observe(element);
    resizeObserver.observe(element);
    hero.addEventListener('pointermove', pointerMove, { passive: true });
    hero.addEventListener('pointerleave', resetPointer);
    hero.addEventListener('pointerdown', pointerDown, { passive: true });
    window.addEventListener('pointerup', pointerUp, { passive: true });
    window.addEventListener('pointercancel', pointerUp, { passive: true });
    window.addEventListener('blur', resetPointer);
    document.addEventListener('visibilitychange', syncPlayback);
    reducedMotion.addEventListener('change', motionPreferenceChanged);
    finePointer.addEventListener('change', pointerPreferenceChanged);
    canvas.addEventListener('webglcontextlost', contextLost);
    canvas.addEventListener('webglcontextrestored', initialize);
    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener('pointermove', pointerMove);
      hero.removeEventListener('pointerleave', resetPointer);
      hero.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointerup', pointerUp);
      window.removeEventListener('pointercancel', pointerUp);
      window.removeEventListener('blur', resetPointer);
      document.removeEventListener('visibilitychange', syncPlayback);
      reducedMotion.removeEventListener('change', motionPreferenceChanged);
      finePointer.removeEventListener('change', pointerPreferenceChanged);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', initialize);
      release();
    };
  }, []);

  return <div ref={root} className="hero-amoeba" aria-hidden="true">
    <span className="hero-amoeba-fallback" />
    <canvas className="hero-amoeba-canvas" />
  </div>;
}
