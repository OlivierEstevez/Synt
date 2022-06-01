import setGradient from "../utils/p5 functions/gradient"

export default function Testo(s) {

    let canvasSize = {
        x: 800,
        y: 800
    }
    let i = 0
    let color

    let volume
    let ticks
    let bpm

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
    }

    s.draw = () => {
        s.background(0)
        let visual = new visualizer(0, 0, canvasSize.x, canvasSize.y)
        visual.show(i)

        // i+= 60 / 60 / props.bpm * 30
        // i+= 0.1
        i+= 60 / bpm / 10 * 4
    }

    s.updateWithProps = props => {
        volume = props.volume
        ticks = props.ticks
        bpm = props.bpm
        color = props.color.rgb
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        s.resizeCanvas(canvasSize.x, canvasSize.y)
    }

    class visualizer {
        constructor(x, y, width, height, direction, color) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.direction = direction
            this.color = color
            this.divisions = 32
            this.margin = 8
        }

        show(anim) {
            let sqSize = this.width / (volume.length / this.divisions)
            s.noStroke()

            let sameValueLines = []

            for (let i = 0; i < this.divisions; i++) {
                // Spectrogram
                for (let n = 0; n < volume.length / this.divisions; n++) {
                    let value = volume[n + (i * (volume.length / this.divisions))]
                    let roundValue = Math.round(value)
                    let fixedValue = value.toFixed(1)


                    s.fill(
                        Math.sin(anim / value) * fixedValue * color.r,
                        Math.sin(anim / value) * fixedValue * color.g,
                        Math.sin(anim / value) * fixedValue * color.b
                    )

                    if(value >= 0.6){
                        s.rect(
                            this.x + n * sqSize,
                            i * canvasSize.y / this.divisions,
                            sqSize, this.height / this.divisions
                        )

                        setGradient(s,
                            this.x + n * sqSize,
                            i * canvasSize.y / this.divisions,
                            canvasSize.x, this.height / this.divisions,
                            s.color(0), s.color(Math.sin(anim / value) * fixedValue * 255), "V"
                        )
                    }
                    

                }

            }

        }
    }


}