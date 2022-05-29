import RyojiLike from "./ryoji"
import Filmic from "./Filmic"
import GridSystem from "./GridSystem"
import EmptySketch from "./OnlyVolume"
import Lines from "./Lines"
import Blocks from "./Blocks"
import LinesTwo from "./LinesTwo"

const generators = [
    {
        name: "Lines Pro",
        sketch: LinesTwo
    },
    {
        name: "Blocks",
        sketch: Blocks
    },
    {
        name: "Only volume",
        sketch: EmptySketch
    },
    {
        name: "Ryoji Ikeda",
        sketch: RyojiLike
    },
    {
        name: "Filmic",
        sketch: Filmic
    },
    {
        name: "Lines",
        sketch: Lines
    },
    {
        name: "Grid System",
        sketch: GridSystem
    }
]

export default generators