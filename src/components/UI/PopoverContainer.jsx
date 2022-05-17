import * as Popover from '@radix-ui/react-popover'
import { styled } from "../../styles/theme"

const PopoverContainer = styled(Popover.Content, {
    background: "$grey100",
    border: "1px solid $grey80",
    borderRadius: 8,
    padding: "8px 0px 12px 0px",
    display: "flex",
    flexDirection: "column"
})

export default PopoverContainer