export default function setGradient(canvas, x, y, w, h, c1, c2, axis) {
    canvas.noFill()
    canvas.noStroke()

    if (axis === "V") {
        // Gradiente de arriba a abajo
        for (let i = y; i <= y + h; i++) {
            let inter = canvas.map(i, y, y + h, 0, 1)
            let c = canvas.lerpColor(c1, c2, inter)
            canvas.stroke(c)
            canvas.line(x, i, x + w, i)
        }
    } else if (axis === "H") {
        // Gradiente de izquierda a derecha
        for (let i = x; i <= x + w; i++) {
            let inter = canvas.map(i, x, x + w, 0, 1)
            let c = canvas.lerpColor(c1, c2, inter)
            canvas.stroke(c)
            canvas.line(i, y, i, y + h)
        }
    }
}
