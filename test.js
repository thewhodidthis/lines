'use strict'

const { equal } = require('tapeless')
const { poly } = require('./')

const count = 5
const reach = 100
const shape = poly(reach, count)

equal(shape.length, count, 'will compute', 'poly')
