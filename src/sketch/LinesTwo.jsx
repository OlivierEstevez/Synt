export default function LinesTwo(s){

    let canvasSize = {
        x: 800,
        y: 800
    }
    let i = 0
    let color

    let volume
    let ticks

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
    }

    s.draw = () => {
        s.background(0)
        let visual = new visualizer(0, 0, canvasSize.x, canvasSize.y)
        visual.show(i)

        // i+= 60 / 60 / props.bpm * 30
        i+= 0.01
    }

    s.updateWithProps = props => {
        volume = props.volume
        ticks = props.ticks
        color = props.color.rgb
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        s.resizeCanvas(canvasSize.x, canvasSize.y)
    }

    // s.keyPressed = () => {
    //     if(s.key == "s")
    //         s.save("pop.png")
    // }

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
                        fixedValue * color.r,
                        fixedValue * color.g,
                        fixedValue * color.b
                    )

                    // s.rect(
                    //     this.x + n * sqSize,
                    //     i * canvasSize.y / this.divisions,
                    //     sqSize, this.height / this.divisions
                    // )


                    let threshold = anim % 10 / 10
                    if(value >= threshold && value <= threshold + 0.01){
                        sameValueLines.push({x: this.x + n * sqSize, y: i * canvasSize.y / this.divisions, value: threshold})
                    }

                }

            }

            // s.stroke(255)
            for(let i = 0; i < sameValueLines.length; i++){
                for(let q = 0;q < sameValueLines.length; q++){
                    s.stroke(255)
                    s.line(
                        sameValueLines[i].x + sqSize/2,
                        sameValueLines[i].y + (this.height / this.divisions) / 2,
                        sameValueLines[q].x + sqSize/2,
                        sameValueLines[q].y + (this.height / this.divisions) / 2
                    )
                }

            }

        }
    }


}