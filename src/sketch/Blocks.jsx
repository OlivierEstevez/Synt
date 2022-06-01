import imageFile from "./assets/circle.png"

export default function Blocks(s){

    let canvasSize = {
        x: 800,
        y: 800
    }
    let i = 0
    let color

    let volume
    let ticks

    let image

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
        image = s.loadImage(imageFile)
    }

    s.draw = () => {
        s.background(0)
        let visual = new visualizer(0, 0, canvasSize.x, canvasSize.y)
        visual.show(i)

        // i+= 60 / 60 / props.bpm * 30
        i+= 0.1
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
            this.margin = 0
        }

        show(anim) {

            // // VOLUME
            // s.noStroke()
            // let sqSize = this.width / (volume.length)
            // for (let n = 0; n < volume.length; n++){
            //     let value = volume[n]
            //     s.fill(value*255)
            //     s.rect(this.x + n*sqSize, canvasSize.y / 2, sqSize, 20)
            // }

            // // TICKS / RHYTHM
            // s.stroke(255, 0, 0)
            // let rhythm = Math.round(ticks.length / this.divisions)
            // let dividerSize = canvasSize.x / rhythm
            // s.line(0, canvasSize.y / 2, canvasSize.x, canvasSize.y / 2)
            // for(let i = 0; i < rhythm; i++){
            //     s.line(i * dividerSize, 0, i * dividerSize, canvasSize.y)

            //     let volumePart = volume.length / rhythm
            //     for(let n = 0; n < volume.length / rhythm; n++){
            //         s.fill(255)
            //         s.rect(this.x + n*sqSize * i, canvasSize.y / 2, sqSize, 20)
            //     }

            // }

            let sqSize = this.width / (volume.length / this.divisions)
            s.noStroke()

            let sameValueLines = []

            for (let i = 0; i < this.divisions; i++) {
                // Spectrogram
                for (let n = 0; n < volume.length / this.divisions; n++) {
                    let value = volume[n + (i * (volume.length / this.divisions))]
                    let roundValue = Math.round(value)
                    let fixedValue = value.toFixed(1)

                    s.fill(255)
                    s.rect(
                        this.x + n * sqSize,
                        i * canvasSize.y / this.divisions,
                        sqSize, this.height / this.divisions
                    )

                    // s.fill(0)
                    // s.ellipse(
                    //     this.x + n * sqSize + sqSize/2,
                    //     i * canvasSize.y / this.divisions + (canvasSize.y / this.divisions)/2 + 
                    //         (canvasSize.y / this.divisions)*value,
                    //     sqSize, this.height / this.divisions
                    // )
                    
                    const size = 2
                    s.image(image,
                        this.x + n * sqSize,
                        i * canvasSize.y / this.divisions - canvasSize.y / this.divisions + (canvasSize.y / this.divisions) * value,
                        sqSize * size, this.height / this.divisions * size
                    )
                    


                }

            } 

        }
    }

}