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


// https://en.wikipedia.org/wiki/Superformula
var foxy = function (m1, n1, n2, n3, a, b, m2) {
  if ( m1 === void 0 ) m1 = 0;
  if ( a === void 0 ) a = 1;
  if ( b === void 0 ) b = a;
  if ( m2 === void 0 ) m2 = m1;

  var cos = Math.cos;
  var pow = Math.pow;
  var abs = Math.abs;

  var input = [a, b, m1, m2, n2, n3];
  var shift = TAU * 0.25;

  var score = function (phi, t1, id) {
    if ( t1 === void 0 ) t1 = 0;
    if ( id === void 0 ) id = 0;

    var ref = input.filter(function (v, i) { return ((i + id) % 2 ? 0 : v); });
    var k = ref[0];
    var m = ref[1];
    var n = ref[2];

    var q = m * phi * 0.25;

    // Turn cos into sin
    q += id ? shift : 0;

    var t2 = cos(q) / k;

    t2 = abs(t2);
    t2 = pow(t2, n);

    if (id === 1) {
      return t1 + t2
    }

    return score(phi, t2, id + 1)
  };

  return Array.from({ length: 360 }).map(function (v, i) {
    var angle = rad(i);
    var t = score(angle);
    var reach = pow(t, 1 / n1);

    return abs(reach) ? poltocar(angle, 1 / reach) : { x: 0, y: 0 }
  })
};

var canvas = document.querySelector('canvas');
var target = canvas.getContext('2d');
var center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };

var radius = 100;
var points = foxy(8, 0.5, 0.5, 8);

target.strokeStyle = 'white';

target.translate(center.x + 0.5, center.y + 0.5);
target.beginPath();

points.forEach(function (p) {
  target.lineTo(p.x * radius, p.y * radius);
});

target.closePath();
target.stroke();

}());

