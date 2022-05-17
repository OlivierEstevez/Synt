import { styled } from "./../../styles/theme"

const Button = styled("button", {
  appearance: "none",
  cursor: "pointer",
  background: "$white",
  border: "1px solid $white",
  borderRadius: 99999,
  color: "$black",

  variants: {
    outline: {
      true: {
        background: "transparent",
        color: "$white",
        border: "1px solid $white",

        "&:hover": {
          color: "$grey40",
          borderColor: "$grey40"
        }
      },
      false: {
        "&:hover": {
          background: "$grey20",
          borderColor: "$grey20"
        }
      }
    },
    size: {
      large: {
        fontSize: "$body",
        padding: "4px 18px",
      },
      mid: {
        fontSize: "$small",
        padding: "4px 16px",
      }
    }
  },

  defaultVariants: {
    outline: false,
    size: "large"
  }
  
})

export default Button