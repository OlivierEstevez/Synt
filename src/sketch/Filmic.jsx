export default function filmic(s){

    let canvasSize = {
        x: 800,
        y: 800
    }
    let i = 0
    let color

    let volume
    let animate
    let bpm

    s.setup = () => {
        s.createCanvas(canvasSize.x, canvasSize.y)
        s.background(0)
        s.noSmooth()
    }

    s.draw = () => {
        s.background(0)
        let visual = new filmicSpectrogram(0, 0, s.width, s.height)
        visual.show(i)

        i+= 60 / bpm / 10
    }

    s.updateWithProps = props => {
        volume = props.volume
        canvasSize.x = props.sizeX
        canvasSize.y = props.sizeY
        color = props.color.rgb
        animate = props.animate
        bpm = props.bpm
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

                    animate ? color.r*value * Math.sin(anim / value) : color.r*value,
                    animate ? color.g*value * Math.sin(anim / value) : color.g*value,
                    animate ? color.b*value * Math.sin(anim / value) : color.b*value

                )
                s.rect(this.x + sqSize*i, this.y, sqSize, this.height)
            }

        }
    }

}