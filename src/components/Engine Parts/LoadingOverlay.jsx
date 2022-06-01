import { styled } from "../../styles/theme"

const LoadingOverlay = styled("div", {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.75)",
    zIndex: 10
})

export default LoadingOverlay