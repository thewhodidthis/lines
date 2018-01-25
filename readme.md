> Parametric solutions for common polar equations worth drawing with, superformula included

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/multipolar
```

### Usage
```js
import { poly } from 'multipolar'

const canvas = document.createElement('canvas')
const target = canvas.getContext('2d')
const center = { x: canvas.width * 0.5, y: canvas.height * 0.5 }

// Draw an evil pentagram
const points = poly(center.y, 5)

target.translate(center.x + 0.5, center.y + 0.5)
target.rotate(Math.PI * 0.5)
target.beginPath()

points.forEach((p, i) => {
    const s = (i + 3) % points.length
    const n = points[s]

    target.moveTo(p.x, p.y)
    target.lineTo(n.x, n.y)
})

target.stroke()

document.body.appendChild(canvas)
```
