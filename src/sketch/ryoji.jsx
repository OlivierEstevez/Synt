export default function Ryoji(s){

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
        i+= 0.5
    }

    s.updateWithProps = props => {
        volume = props.volume
        ticks = props.ticks
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

                    // s.stroke(255)

                    // s.fill(Math.sin(anim / value) * fixedValue * 255)

                    // if (value >= 0.25 && value <= 0.5) {
                    //     s.fill(255)
                    // } else {
                    //     s.fill(0)
                    // }

                    // if(props.volume[n + (i * (props.volume.length / this.divisions))] >= 0.5 && props.volume[n + (i * (props.volume.length / this.divisions)) - 1] <= 0.5){
                    //     s.fill(0, 255, 0)
                    // }

                    // if(props.volume[n + (i * (props.volume.length / this.divisions))] >= 0.5 && props.volume[n + (i * (props.volume.length / this.divisions)) + 1] <= 0.5){
                    //     s.fill(0, 0, 255)
                    // }

                    // s.rect(
                    //     this.x + n * sqSize,
                    //     i * canvasSize.y / this.divisions,
                    //     sqSize, this.height / this.divisions
                    // )
                    // setGradient(s,
                    //     this.x + n * sqSize,
                    //     i * canvasSize.y / this.divisions,
                    //     sqSize, this.height / this.divisions,
                    //     s.color(0), s.color(Math.sin(anim / value) * fixedValue * 255), "V"
                    // )


                    // let gradient = s.drawingContext.createLinearGradient(
                    //     this.x + n * sqSize,
                    //     i * canvasSize.y / this.divisions,
                    //     sqSize, this.height / this.divisions
                    // )
                    // gradient.addColorStop(0, s.color(0, 0, 0, 100))
                    // gradient.addColorStop(0.1, s.color(255, 0, 0, 100))
                    // s.drawingContext.fillStyle = gradient

                    s.fill(
                        Math.sin(anim / value) * fixedValue * color.r,
                        Math.sin(anim / value) * fixedValue * color.g,
                        Math.sin(anim / value) * fixedValue * color.b
                    )

                    s.rect(
                        this.x + n * sqSize,
                        i * canvasSize.y / this.divisions,
                        sqSize, this.height / this.divisions
                    )

                    let threshold = anim % 10 / 10
                    if(value >= threshold && value <= threshold + 0.01){
                        sameValueLines.push({x: this.x + n * sqSize, y: i * canvasSize.y / this.divisions})
                    }

                    // let c1 = s.color(120 * roundValue)
                    // let c2 = s.color(120 * roundValue)

                    // setGradient(s,
                    //         this.x + n * sqSize, i * canvasSize.y / this.divisions,
                    //         sqSize, this.height / this.divisions,
                    //         c1, c2, "V"
                    // )

                }

            }

            s.stroke(255)
            for(let i = 0; i < sameValueLines.length; i++){
                for(let q = 0;q < sameValueLines.length; q++){
                    // s.line(sameValueLines[i].x + sqSize/2, sameValueLines[i].y + (this.height / this.divisions) / 2, sameValueLines[q].x + sqSize/2, sameValueLines[q].y + (this.height / this.divisions) / 2)
                }

            }

            // TICKS / RHYTHM
            // s.stroke(255, 0, 0)
            // let rhythm = props.ticks.length / this.divisions / 4
            // let dividerSize = canvasSize.x / rhythm
            // s.line(0, canvasSize.y / 2, canvasSize.x, canvasSize.y / 2)
            // for(let i = 0; i < rhythm; i++){
            //     s.line(i * dividerSize, canvasSize.y / 2 - 100, i * dividerSize, canvasSize.y / 2 + 100)
            // }

        }
    }


}