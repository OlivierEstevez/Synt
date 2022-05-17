import React from "react"
import { styled } from "./../../styles/theme"

const EngineFooterContainer = styled("div", {
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 24px",
  backgroundColor: "$grey100",
  color: "$grey40",
  fontFamily: "$mono",
  fontSize: "$extraSmall"
})

const EngineFooterDivider = styled("div", {
  display: "flex",
  gap: 24
})

export default function EngineFooter(props) {
  return (
    <EngineFooterContainer>
        <div>Synt Engine v0.1.3</div>
        <EngineFooterDivider>
            <span>{props.renderer}</span>
            <span>{`${props.sizeW}px / ${props.sizeH}px`}</span>
        </EngineFooterDivider>
    </EngineFooterContainer>
  )
}
