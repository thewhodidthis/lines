(function () {
'use strict';

const TAU = 2 * Math.PI;
const DEG = TAU / 360;

const rad = x => x * DEG;

const poltocar = (t = 0, r = 1) => ({
  x: r * Math.cos(t),
  y: r * Math.sin(t)
});

const rose = (radius = 0, a = 2, b = 3, offset = 0) => {
  // Decides number of petals
  const k = a / b;

  // For calculating how many iterations produce a closed curve, assuming k is rational
  const r = 2 - ((b * a) % 2);

  return Array.from({ length: 180 * r * b }).map((v, i) => {
    const angle = rad(i);
    const reach = radius * Math.cos(k * angle);

    return poltocar(angle, reach + offset)
  })
};

const canvas = document.querySelector('canvas');
const target = canvas.getContext('2d');

target.strokeStyle = '#888';
target.lineWidth = 1.5;

const step = { x: canvas.width / 4, y: canvas.height / 3 };
const cell = { x: step.x * 0.5, y: step.y * 0.5 };
const size = cell.y * 0.75;

const grid = (v, i) => ({ x: i % 4, y: Math.floor(i / 4) });

Array.from({ length: 4 * 3 }).map(grid).forEach((v) => {
  const x = (v.x * step.x) + cell.x;
  const y = (v.y * step.y) + cell.y;

  const g = 1 + v.x;
  const n = 5 + (2 * (v.y - 2));
  const d = g === n ? 5 : g;

  target.save();
  target.translate(x, y);
  target.beginPath();

  rose(size, n, d).forEach((p) => {
    target.lineTo(p.x, p.y);
  });

  target.closePath();
  target.stroke();
  target.restore();
});

}());

