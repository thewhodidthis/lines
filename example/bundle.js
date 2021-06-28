(() => {
  // ../node_modules/.pnpm/@thewhodidthis+arithmetics@1.0.0/node_modules/@thewhodidthis/arithmetics/main.js
  var TAU = 2 * Math.PI;
  var RAD = 360 / TAU;
  var DEG = TAU / 360;
  var rad = (x) => x * DEG;

  // ../node_modules/.pnpm/poltocar@3.0.1/node_modules/poltocar/main.js
  var poltocar = (a = 0, r = 1) => ({
    x: r * Math.cos(a),
    y: r * Math.sin(a)
  });
  var main_default = poltocar;

  // ../main.js
  var rose = (radius = 0, a = 2, b = 3, offset = 0) => {
    const k = a / b;
    const r = 2 - b * a % 2;
    return Array.from({ length: 180 * r * b }).map((_, i) => {
      const angle = rad(i);
      const reach = radius * Math.cos(k * angle);
      return main_default(angle, reach + offset);
    });
  };

  // index.js
  var canvas = document.querySelector("canvas");
  var target = canvas.getContext("2d");
  target.strokeStyle = "#888";
  target.lineWidth = 1.5;
  var step = { x: canvas.width / 4, y: canvas.height / 3 };
  var cell = { x: step.x * 0.5, y: step.y * 0.5 };
  var size = cell.y * 0.75;
  var grid = (_, i) => ({ x: i % 4, y: Math.floor(i / 4) });
  Array.from({ length: 4 * 3 }).map(grid).forEach((v) => {
    const x = v.x * step.x + cell.x;
    const y = v.y * step.y + cell.y;
    const g = 1 + v.x;
    const n = 5 + 2 * (v.y - 2);
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
})();
