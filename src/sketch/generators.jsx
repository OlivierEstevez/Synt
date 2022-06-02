import RyojiLike from "./ryoji"
import Filmic from "./Filmic"
import GridSystem from "./GridSystem"
import EmptySketch from "./OnlyVolume"
import PixelStreamer from "./PixelStreamer"
import Blocks from "./Blocks"
import Cartographer from "./Cartographer"

const generators = [
    {
        name: "Filmic",
        sketch: Filmic
    },
    {
        name: "Cartographer",
        sketch: Cartographer
    },
    // {
    //     name: "Blocks",
    //     sketch: Blocks
    // },
        {
            name: "Only volume",
            sketch: EmptySketch
        },
    {
        name: "Ryoji Ikeda",
        sketch: RyojiLike
    },
    {
        name: "Pixel Streamer",
        sketch: PixelStreamer
    },
    {
        name: "Grid System",
        sketch: GridSystem
    }
]

export default generators