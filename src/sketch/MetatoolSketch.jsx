export default function Metatool(s){

    s.setup = () => {
        s.createCanvas(800, 800)
        s.background(120)
    }

    s.draw = () => {
        s.background(120)
        s.rect(50, 50, 20, 20)
    }

    s.updateWithProps = props => {
        
    }

}