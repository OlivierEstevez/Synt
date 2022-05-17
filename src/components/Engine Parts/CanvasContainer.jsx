import { styled } from "../../styles/theme";

const CanavasContainer = styled("div", {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    display: "inline-block",
    lineHeight: 0,
    borderRadius: 4,
    overflow: "hidden",
    zIndex: -1
})

export default CanavasContainer