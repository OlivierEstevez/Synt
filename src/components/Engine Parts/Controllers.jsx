import { styled } from "../../styles/theme";

const ControllersMainContainer = styled("div", {
    position: "absolute",
    bottom: 24,
    width: "100%",
    padding: 24,
    zIndex: 1,
})

export const ControllersContainer = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    width: "100%"
})

export const Controller = styled("div", {
    background: "$black",
    border: "1px solid $grey80",
    borderRadius: 12,
    padding: 12,

    "& h4": {
        marginBottom: 12
    }
})

export default ControllersMainContainer