import React, {createRef, useState, useEffect} from "react"
import { Outlet, Link } from "react-router-dom"
import SYNTLogo from "../extra/SYNTLogo"
import Button from "../UI/Button"

import { styled } from "../../styles/theme"

const EngineHeaderContainer = styled("div", {
  position: "fixed",
  left: 0,
  top: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 24px",
  background: "$black",
  zIndex: 1,
  boxShadow: "$underline80"
})

const EngineHeaderItem = styled("div", {
  display: "flex",
  flexBasis: 250,
  alignItems: "baseline",

  variants: {
    justify: {
      center: {
        justifyContent: "center"
      },
      right: {
        justifyContent: "flex-end"
      }
    }
  }
})

export default function WebHeader(props) {

  return (
    <EngineHeaderContainer>

      <EngineHeaderItem>
        <SYNTLogo />
      </EngineHeaderItem>

      <EngineHeaderItem justify={"center"}>
        <nav>
            {/* <Link to="/About">Visual Generators</Link> */}
            <Link to="/About">About the project</Link>
            {/* <Link to="/About">Synt Issue</Link> */}
        </nav>
      </EngineHeaderItem>

      <EngineHeaderItem justify={"right"}>
        <Link to="/Engine"><Button>Start Engine</Button></Link>
      </EngineHeaderItem>

    </EngineHeaderContainer>
  )
}
