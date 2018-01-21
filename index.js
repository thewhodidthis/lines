'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var arithmetics = require('@thewhodidthis/arithmetics');
var pol2car = require('poltocar');

// https://en.wikipedia.org/wiki/Regular_polygon
var poly = function (radius, n) {
  if ( radius === void 0 ) radius = 0;
  if ( n === void 0 ) n = 3;

  var sector = arithmetics.TAU / n;

  return Array.from({ length: n }).map(function (v, i) { return pol2car(sector * i, radius); })
};

// https://en.wikipedia.org/wiki/Archimedean_spiral
var coil = function (radius, n, a, b, c) {
  if ( radius === void 0 ) radius = 0;
  if ( n === void 0 ) n = 0;
  if ( a === void 0 ) a = 0;
  if ( b === void 0 ) b = 1;
  if ( c === void 0 ) c = 1;

  var length = Math.max(radius, 180) * n * 2;
  var k = 1 / c;

  return Array.from({ length: length }).map(function (v, i) {
    var angle = arithmetics.rad(i);
    var reach = a + (b * Math.pow(angle, k));

    return pol2car(angle, reach)
  })
};

// https://en.wikipedia.org/wiki/Rose_(mathematics)
var rose = function (radius, n, d, offset) {
  if ( radius === void 0 ) radius = 0;
  if ( n === void 0 ) n = 2;
  if ( d === void 0 ) d = 3;
  if ( offset === void 0 ) offset = 0;

  var length = Math.max(radius, 180) * d * 2;
  var k = n / d;

  return Array.from({ length: length }).map(function (v, i) {
    var angle = arithmetics.rad(i);
    var reach = radius * Math.cos(k * angle);

    return pol2car(angle, reach + offset)
  })
};

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

    return abs(reach) ? pol2car(angle, 1 / reach) : { x: 0, y: 0 }
  })
};

exports.poly = poly;
exports.coil = coil;
exports.rose = rose;
exports.foxy = foxy;

