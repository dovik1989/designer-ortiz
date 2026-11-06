// Gera o asset vetorial original; n?o ? rasteriza??o.
import fs from 'node:fs';
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, n) => [a[0] * n, a[1] * n, a[2] * n];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a) => mul(a, 1 / (Math.hypot(...a) || 1));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function center(t) { const r = 2 + .65 * Math.cos(3 * t); return [r * Math.cos(2 * t), r * Math.sin(2 * t), .94 * Math.sin(3 * t)]; }
function rotate([x, y, z]) { const a = -.55, b = .28, c = -.45; const y1 = y * Math.cos(a) - z * Math.sin(a), z1 = y * Math.sin(a) + z * Math.cos(a); const x2 = x * Math.cos(b) + z1 * Math.sin(b), z2 = -x * Math.sin(b) + z1 * Math.cos(b); return [x2 * Math.cos(c) - y1 * Math.sin(c), x2 * Math.sin(c) + y1 * Math.cos(c), z2]; }
function surface(t, v) { const c = center(t), tangent = norm(sub(center(t + .001), center(t - .001))), n = norm(cross(tangent, [0, 0, 1])), b = cross(tangent, n), normal = add(mul(n, Math.cos(v)), mul(b, Math.sin(v))); return { point: rotate(add(c, mul(normal, .44))), normal: rotate(normal) }; }
function mesh() {
    const facets = [], N = 144, M = 16, light = norm([-1, -.7, 2]), half = norm(add(light, [0, 0, 1]));
    for (let i = 0; i < N; i++)
        for (let j = 0; j < M; j++) {
            const t = i / N * Math.PI * 2, v = j / M * Math.PI * 2, dt = 2 * Math.PI / N, dv = 2 * Math.PI / M;
            const corners = [surface(t, v), surface(t + dt, v), surface(t + dt, v + dv), surface(t, v + dv)];
            const normal = norm(corners.reduce((s, c) => add(s, c.normal), [0, 0, 0]));
            const diffuse = Math.max(0, dot(normal, light)), spec = Math.pow(Math.max(0, dot(normal, half)), 28), rim = Math.pow(1 - Math.abs(normal[2]), 3) * .15;
            const base = [143, 42, 224], rgb = base.map((channel, k) => Math.min(255, Math.round(channel * (.2 + diffuse * .83 + rim) + spec * ([160, 180, 195][k]))));
            facets.push({ points: corners.map(({ point: [x, y, z] }) => { const perspective = 8 / (8 - z * .18); return `${(320 + x * 82 * perspective).toFixed(2)},${(310 + y * 82 * perspective).toFixed(2)}`; }).join(' '), color: `rgb(${rgb.join(',')})`, z: corners.reduce((s, c) => s + c.point[2], 0) / 4 });
        }
    return facets.sort((a, b) => a.z - b.z);
}
const facets = mesh();

const polygons=facets.map(f=>`<polygon points="${f.points}" fill="${f.color}" stroke="${f.color}" stroke-width=".35" stroke-linejoin="round"/>`).join('');
fs.writeFileSync(new URL('../public/sculpture.svg',import.meta.url),`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640" fill="none"><g>${polygons}</g></svg>`);
console.log('Escultura SVG gerada: '+facets.length+' faces.');
