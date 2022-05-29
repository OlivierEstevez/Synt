import { useState, useEffect } from "react"
import { styled } from "../../styles/theme";

const ZoomContainer = styled("div", {
    position: "absolute",
    top: 72,
    left: 24,
    display: "inline-block",
    fontFamily: "$mono",
    fontSize: "$extraSmall",
    zIndex: 1,

    "& button": {
        appearance: "none",
        background: "$black",
        border: "1px solid $grey40",
        color: "$grey40",
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 6,
        paddingBottom: 6,
        cursor: "pointer",
        marginRight: -1,

        "&:first-child": {
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
        },

        "&:last-child": {
            marginRight: 0,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
        },

        "&:hover": {
            background: "$grey100"
        }
    }
})

export default function Zoom(props){

    const [zoomLevel, setZoomLevel] = useState(1)

    useEffect(()=>{
        if(props.updateZoom)
            props.updateZoom(zoomLevel)
    }, [zoomLevel])

    const zoomDown = () => {
        if(zoomLevel > 0.5){
            setZoomLevel(zoomLevel-0.5)
        }
    }

    const zoomUp = () => {
        setZoomLevel(zoomLevel+0.5)
    }

    return(
        <ZoomContainer hidden={props.hidden}>
            <button onClick={zoomDown}>-</button>

            <button onClick={()=>setZoomLevel(1)}>{100 * zoomLevel}%</button>

            <button onClick={zoomUp}>+</button>
        </ZoomContainer>
    )
}