export default function filmic(s){

    let canvasSize = {
        x: 800,
        y: 800
    }
    let i = 0
    let color

    let volume

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
        s.noSmooth()
    }

    s.draw = () => {
        s.background(0)
        let visual = new filmicSpectrogram(0, 0, s.width, s.height)
        visual.show(i)

        i += 0.1
    }

    s.updateWithProps = props => {
        volume = props.volume
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        color = props.color.rgb
        s.resizeCanvas(canvasSize.x, canvasSize.y)
    }

    // s.keyPressed = () => {
    //     if(s.key == "s")
    //         s.save("pop.png")
    // }

    class filmicSpectrogram {
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
            let sqSize = this.width / volume.length
            s.noStroke()

            for(let i = 0; i < volume.length; i ++){
                let value = volume[i]
                s.fill(
                    color.r*value,
                    color.g*value,
                    color.b*value
                )
                s.rect(this.x + sqSize*i, this.y, sqSize, this.height)
            }

        }
    }

}