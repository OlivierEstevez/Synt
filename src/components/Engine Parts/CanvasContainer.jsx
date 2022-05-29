import { styled } from "../../styles/theme"

const CanvasContainer = styled("div", {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "inline-block",
    lineHeight: 0,
    borderRadius: 4,
    overflow: "hidden",
    zIndex: 0,
    transition: "transform 0.2s ease"
})

export default CanvasContainer

export const CanvasPlaceholder = styled("div", {
    background: "$grey100",
    minWidth: 600,
    minHeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "$mono",
    fontSize: "$small",
    lineHeight: 1.5,
    
    "& span": {
        width: "45%",
        textAlign: "center"
    }
})