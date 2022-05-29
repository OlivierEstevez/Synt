import * as Popover from '@radix-ui/react-popover'
import { styled } from "../../styles/theme"

const PopoverContainer = styled(Popover.Content, {
    background: "$grey100",
    border: "1px solid $grey80",
    borderRadius: 8,
    padding: "8px 12px 12px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 12
})

export const Flex = styled("div", {
    display: "Flex",
    gap: 12
})

export const FlexCenter = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})

export default PopoverContainer