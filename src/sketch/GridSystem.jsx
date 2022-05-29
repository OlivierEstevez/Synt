export default function GridSystem(s){

    let canvasSize = {
        x: 800,
        y: 800
    }
    let volume
    let ticks

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
        s.noSmooth()
    }

    s.draw = () => {
        s.background(0)
        let gridVisual = new grid(0, 0, canvasSize.x, canvasSize.y).show()

    }

    s.updateWithProps = props => {
        volume = props.volume
        ticks = props.ticks
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        s.resizeCanvas(canvasSize.x, canvasSize.y)
    }

    // s.keyPressed = () => {
    //     if(s.key == "s")
    //         s.save("pop.png")
    // }

    class grid {
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

        show() {
            let sqSize = this.width / volume.length
            let threshold = 0.5
            for (let n = 0; n < volume.length; n++) {
                let value = volume[n]
                let roundValue = Math.round(value)
                let fixedValue = value.toFixed(1)
                let fixedValueTwo = value.toFixed(2)

                s.noStroke()
                s.fill(255)

                // if(fixedValue >= 0.75)
                if(fixedValueTwo >= threshold && fixedValueTwo <= threshold + 0.01)
                    s.rect(
                        this.x + sqSize*n, this.y, sqSize, this.height
                    )

                

            }

            let tickSize = this.height / (ticks.length / this.divisions)
            s.stroke(255)
            for(let t = 0; t < ticks.length / this.divisions; t++){
                s.line(this.x, this.y + t*tickSize, this.width, this.y + t*tickSize)
            }

        }
    }


}