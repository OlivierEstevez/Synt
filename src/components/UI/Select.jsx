import React from "react"
import { styled } from "@stitches/react"

const SelectContainer = styled("div", {
    position: "relative",

    "& span": {
        position: "absolute",
        right: 4,
        top: "45%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        pointerEvents: "none"
    }
})

const StyledSelect = styled("select", {
    appearance: "none",
    background: "none",
    border: "none",
    color: "$white",
    cursor: "pointer",
    paddingRight: 16
})

export default function Select(props) {
    return (
        <SelectContainer>
            <StyledSelect {...props}>
                {props.children}
            </StyledSelect>
            <span>
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L3.82843 3.82843L6.65685 1" stroke="white" strokeLinecap="round" />
                </svg>
            </span>
        </SelectContainer>
    )
}
