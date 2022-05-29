import { styled } from "../../styles/theme";

const Text = styled("p", {
    color: "$grey40",

    variants: {
        size: {
            small: {
                fontSize: "$small"
            }
        }
    }
})

export default Text