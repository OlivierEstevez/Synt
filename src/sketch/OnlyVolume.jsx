export default function onlyVolume(s) {

    let canvasSize = {
        x: 800,
        y: 800
    }
    let color

    let volume, ticks

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
        s.rectMode(s.CENTER)
    }

    s.draw = () => {
        s.background(0)

        let data = volume.length
        let sqSize = canvasSize.x / data
        for (let x = 0; x < data; x++) {
            s.noStroke()
            let value = volume[x]
            // value = Math.round(value)

            s.noStroke()
            s.fill(color.r, color.g, color.b)
            s.rect(0 + x * sqSize, s.height/2, sqSize, value * canvasSize.y)
        }
    }

    s.updateWithProps = props => {
        volume = props.volume
        ticks = props.ticks
        color = props.color.rgb
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        s.resizeCanvas(canvasSize.x, canvasSize.y)
    }
}