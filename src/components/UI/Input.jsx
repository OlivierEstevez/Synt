import React from "react"
import { styled } from "./../../styles/theme"

const InputComponent = React.forwardRef((props, ref) => {
    return (
        <div style={{position: "relative"}}>
            <input ref={ref} {...props}></input>
            {props.units ? <span className="units">{props.units}</span> : ""}
        </div>
    )
}) 


const Input = styled(InputComponent, {
    appearance: "none",
    background: "transparent",
    color: "$grey20",
    border: "1px solid $grey20",
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 30,
    fontFamily: "$mono",
    fontSize: "$small",
    position: "relative",
    width: "100%",

    "& + .units": {
        fontSize: "$small",
        fontFamily: "$mono",
        textAlign: "right",
        position: "absolute",
        background: "$white",
        color: "$black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        top: 0,
        right: 0,
        paddingRight: 6,
        paddingLeft: 6,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        pointerEvents: "none"
    }

})

export default Input

export const LinkedInputsComponent = styled("div", {
    marginTop: 4,
    marginBottom: 24,
    display: "flex",
    justifyContent: "center",
    width: "60%",
    height: 12,
    border: "1px solid $grey20",
    borderTop: "none",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
})