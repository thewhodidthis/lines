'use strict'

const { equal } = require('tapeless')
const { poly } = require('./')

const count = 5
const reach = 100
const shape = poly(reach, count)

equal.describe('poly', 'will compute').test(shape.length, count)
