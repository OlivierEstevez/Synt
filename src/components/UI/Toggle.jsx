import * as Toggle from "@radix-ui/react-toggle"
import { styled } from "../../styles/theme"

const ToggleSwitch = styled(Toggle.Root, {
    appearance: "none",
    position: "relative",
    height: 18,
    width: 32,
    borderRadius: 99,
    background: "$grey80",
    border: "1px solid $grey20",
    cursor: "pointer",

    "&::after": {
        content: "''",
        position: "absolute",
        left: 2,
        top: 2,
        height: 12,
        width: 12,
        borderRadius: 99,
        background: "$grey20"
    },

    "&[data-state=on]": {
        background: "transparent",
        borderColor: "$white",

        "&::after": {
            left: "auto",
            right: 2,
            background: "$white"
        }
    }
})

export default ToggleSwitch

export const ToggleIcon = styled(Toggle.Root, {
    appearance: "none",
    background: "$grey100",
    border: "none",
    height: 24,
    width: 24,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    "&[data-state=on]": {
        background: "$grey20",

        "& svg": {
            fill: "$grey100"
        }
    }
})