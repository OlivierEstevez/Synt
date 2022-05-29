import { styled } from "@stitches/react"

const InputLabelContainerStyled = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: 2,

    "& span": {
        fontSize: "small",
        color: "$grey20"
    }
})

export default function InputLabelContainer(props){
    return(
        <InputLabelContainerStyled>
            {props.label ? <span>{props.label}</span> : ""}
            {props.children}
        </InputLabelContainerStyled>
    )
}