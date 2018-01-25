(function () {
'use strict';

var TAU = 2 * Math.PI;

var DEG = TAU / 360;

// Convert radians to degrees


// Convert degrees to radians
var rad = function (x) { return x * DEG; };

// Linear interpolator


// Normalize values between 0 and 1


// Translate values from one coordinate space to another


// Constrain values within range


// Get random integer in range, hi exclusive, lo inclusive


// Calculate distance between two points

/**
 * Helps covert from polar
 * @module poltocar
 * @param {Number} t - Angle (theta)
 * @param {Number} r - Radius
 * @returns {Object} - Vector like
 * @example
 * poltocar(Math.PI);
 */
var poltocar = function (t, r) {
  if ( t === void 0 ) t = 0;
  if ( r === void 0 ) r = 1;

  return ({
  x: r * Math.cos(t),
  y: r * Math.sin(t)
});
};

// https://en.wikipedia.org/wiki/Regular_polygon


// https://en.wikipedia.org/wiki/Archimedean_spiral


// https://en.wikipedia.org/wiki/Rose_(mathematics)
var rose = function (radius, a, b, offset) {
  if ( radius === void 0 ) radius = 0;
  if ( a === void 0 ) a = 2;
  if ( b === void 0 ) b = 3;
  if ( offset === void 0 ) offset = 0;

  // Decides number of lobes
  var k = a / b;

  // For calculating how many iterations produce a closed curve, assuming k is rational
  var c = 2 - ((b * a) % 2);

  return Array.from({ length: 180 * c * b }).map(function (v, i) {
    var angle = rad(i);
    var reach = radius * Math.cos(k * angle);

    return poltocar(angle, reach + offset)
  })
};

// https://en.wikipedia.org/wiki/Superformula

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');

target.strokeStyle = '#888';
target.lineWidth = 1.5;

var step = { x: canvas.width / 4, y: canvas.height / 3 };
var cell = { x: step.x * 0.5, y: step.y * 0.5 };
var size = cell.y * 0.75;

var grid = function (v, i) { return ({ x: i % 4, y: Math.floor(i / 4) }); };

Array.from({ length: 4 * 3 }).map(grid).forEach(function (v) {
  var x = (v.x * step.x) + cell.x;
  var y = (v.y * step.y) + cell.y;

  var n = 5 + (2 * (v.y - 2));
  var g = 1 + v.x;
  var d = g === n ? 5 : g;

  target.save();
  target.translate(x, y);
  target.beginPath();

  rose(size, n, d).forEach(function (p) {
    target.lineTo(p.x, p.y);
  });

  target.closePath();
  target.stroke();
  target.restore();
});

}());

