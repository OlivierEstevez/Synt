export default function Blocks(s){

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
            this.divisions = 64
            this.margin = 8
        }

        show(anim) {

            // VOLUME
            s.noStroke()
            let sqSize = this.width / (volume.length)
            for (let n = 0; n < volume.length; n++){
                let value = volume[n]
                s.fill(value*255)
                s.rect(this.x + n*sqSize, canvasSize.y / 2, sqSize, 20)
            }

            // TICKS / RHYTHM
            s.stroke(255, 0, 0)
            let rhythm = Math.round(ticks.length / this.divisions)
            let dividerSize = canvasSize.x / rhythm
            s.line(0, canvasSize.y / 2, canvasSize.x, canvasSize.y / 2)
            for(let i = 0; i < rhythm; i++){
                s.line(i * dividerSize, 0, i * dividerSize, canvasSize.y)

                let volumePart = volume.length / rhythm
                for(let n = 0; n < volume.length / rhythm; n++){
                    s.fill(255)
                    s.rect(this.x + n*sqSize * i, canvasSize.y / 2, sqSize, 20)
                }

            }
            
            

        }
    }

}