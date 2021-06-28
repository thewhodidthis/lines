import { assert, report } from "tapeless"
import { poly } from "./main.js"

const { equal } = assert

const count = 5
const reach = 100
const shape = poly(reach, count)

equal
  .describe("poly", "will compute")
  .test(shape.length, count)

report()
