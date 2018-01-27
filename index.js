'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arithmetics = require('@thewhodidthis/arithmetics');
var point = require('poltocar');

/**
 * Regular polygon
 * @param {Number} [radius=0] - Half size of circumcircle
 * @param {Number} [sides=3] - No. of sides
 * @returns {Array.<Object>} - Points x, y
 * @see {@link https://en.wikipedia.org/wiki/Regular_polygon}
 * @example
 * poly(50, 8); // Octagon with opposite facing vertices 100 units apart
 */
var poly = function (radius, sides) {
  if ( radius === void 0 ) radius = 0;
  if ( sides === void 0 ) sides = 3;

  // Theta increment, compute once
  var r = arithmetics.TAU / sides;

  return Array.from({ length: sides }).map(function (v, i) { return point(r * i, radius); })
};

/**
 * Archimedean spiral (general)
 * @param {Number} [radius=0] - Half size of circumcircle
 * @param {Number} [turns=1] - No. of turns
 * @param {Number} [phase=1] - Offset
 * @param {Number} [n=1] - Controls how tight the wrapping is
 * @returns {Array.<Object>} - Points x, y
 * @see {@link https://en.wikipedia.org/wiki/Archimedean_spiral}
 */
var coil = function (radius, turns, phase, n) {
  if ( radius === void 0 ) radius = 0;
  if ( turns === void 0 ) turns = 1;
  if ( phase === void 0 ) phase = 1;
  if ( n === void 0 ) n = 1;

  // Decides type of spiral (eg. with Fermat's, n = 2)
  var k = 1 / n;

  // Compute distance between turns
  var r = radius / (arithmetics.TAU * turns);

  return Array.from({ length: 360 * turns }).map(function (v, i) {
    var angle = arithmetics.rad(i);
    var reach = phase + (r * Math.pow(angle, k));

    return point(angle, reach)
  })
};

/**
 * Rose curve
 * @param {Number} [radius=0] - Half size of circumcircle
 * @param {Number} [a=2] - k ratio antecedent
 * @param {Number} [b=3] - k ratio consequent
 * @param {Number} [offset=0] - Radial offset
 * @returns {Array.<Object>} - Points x, y
 * @see {@link http://mathworld.wolfram.com/Rose.html}
 */
var rose = function (radius, a, b, offset) {
  if ( radius === void 0 ) radius = 0;
  if ( a === void 0 ) a = 2;
  if ( b === void 0 ) b = 3;
  if ( offset === void 0 ) offset = 0;

  // Decides number of petals
  var k = a / b;

  // For calculating how many iterations produce a closed curve, assuming k is rational
  var r = 2 - ((b * a) % 2);

  return Array.from({ length: 180 * r * b }).map(function (v, i) {
    var angle = arithmetics.rad(i);
    var reach = radius * Math.cos(k * angle);

    return point(angle, reach + offset)
  })
};

/**
 * Superformula
 * @param {Number} [radius=0] - Half size of circumcircle
 * @param {Number} [m1=0] - Adds rotational symmetry
 * @param {Number} n1 - Real, controls pinching
 * @param {Number} n2 - Real, controls pinching
 * @param {Number} n3 - Real, controls pinching
 * @param {Number} [a=1] - Real excluding zero, controls sizing
 * @param {Number} [b=a] - Real excluding zero, controls sizing
 * @param {Number} [m2=m1] - Adds rotational symmetry
 * @returns {Array.<Object>} - Points x, y
 * @see {@link http://paulbourke.net/geometry/supershape}
 */
var foxy = function (radius, m1, n1, n2, n3, a, b, m2) {
  if ( radius === void 0 ) radius = 0;
  if ( m1 === void 0 ) m1 = 0;
  if ( a === void 0 ) a = 1;
  if ( b === void 0 ) b = a;
  if ( m2 === void 0 ) m2 = m1;

  var cos = Math.cos;
  var pow = Math.pow;
  var abs = Math.abs;

  var input = [a, b, m1, m2, n2, n3];
  var shift = arithmetics.TAU * 0.25;

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
    var angle = arithmetics.rad(i);
    var t = score(angle);
    var reach = pow(t, 1 / n1);

    return abs(reach) ? point(angle, radius / reach) : { x: 0, y: 0 }
  })
};

exports.poly = poly;
exports.coil = coil;
exports.rose = rose;
exports.foxy = foxy;

