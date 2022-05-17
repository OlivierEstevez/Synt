import p5 from "p5"

export default function saveCanvas(canvas, name, format) {
    let fileFormat = format
    if(format != "png" || "jpg" || "gif"){
        format = "jpg"
    }

    console.log(canvas)

    // canvas.saveCanvas(canvas, name, format)
}