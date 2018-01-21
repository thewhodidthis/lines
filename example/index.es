import { foxy } from '../index.mjs'

const canvas = document.querySelector('canvas')
const target = canvas.getContext('2d')
const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 }

const radius = 100
const points = foxy(8, 0.5, 0.5, 8)

target.strokeStyle = 'white'

target.translate(center.x + 0.5, center.y + 0.5)
target.beginPath()

points.forEach((p) => {
  target.lineTo(p.x * radius, p.y * radius)
})

target.closePath()
target.stroke()
