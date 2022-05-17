import { createStitches } from "@stitches/react"

export const {styled, css} = createStitches({
    theme: {
        colors: {
            white: "#ffffff",
            black: "#000000",
            grey100: "#141414",
            grey80: "#2F2F2F",
            grey40: "#9E9E9E",
            grey20: "#DBDBDB",
        },
        fonts: {
            sans: "IBM Plex Sans, sans-serif",
            mono: "IBM Plex Mono, monospace"
        },
        fontSizes: {
            header1: "5.7rem",
            header2: "4.3rem",
            header3: "3.2rem",
            header4: "2.4rem",
            body: "1.8rem",
            small: "1.4rem",
            extraSmall: "1.0rem"
        },
        shadows: {
            underline80: "0px 1px 0px $colors$grey80"
        }
    }
})