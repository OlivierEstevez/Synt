import React, {createRef, useState, useEffect} from "react"
import SYNTLogo from "../extra/SYNTLogo"
import Button from "../UI/Button"
import PopoverContainer from "../UI/PopoverContainer"

import * as Popover from '@radix-ui/react-popover'
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

export default function EngineHeader(props) {

  const [size, setSize] = useState({x: props.width, y: props.height})

  useEffect(()=>{
    if(props.updateSize)
      props.updateSize(size.x, size.y)
  }, [size])

  let widthInput = createRef()
  let heightInput = createRef()

  return (
    <EngineHeaderContainer>

      <EngineHeaderItem>
        <SYNTLogo type="Engine" />
      </EngineHeaderItem>

      <EngineHeaderItem justify={"center"}>
        {props.children}
      </EngineHeaderItem>

      <EngineHeaderItem justify={"right"}>
        <p>Help</p>

        <Popover.Root>
          <Popover.Trigger asChild><Button outline={true}>Settings</Button></Popover.Trigger>
          <Popover.Anchor />
          <PopoverContainer>
            <h3>Artboard size</h3>
            <input ref={widthInput} type={"text"} pattern="[0-9]*" defaultValue={size.x} placeholder={"width"}></input>
            <input ref={heightInput} type={"text"} pattern="[0-9]*" defaultValue={size.y} placeholder={"height"}></input>
            <Button outline onClick={() => (widthInput.current.value != "" && widthInput.current.value != "") ?
              setSize({x: widthInput.current.value, y: heightInput.current.value})
              : console.log("no hay nada!")}>setSize</Button>
            {/* <Popover.Close /> */}
            <Popover.Arrow />
          </PopoverContainer>
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger asChild><Button>Export</Button></Popover.Trigger>
          <Popover.Anchor />
          <PopoverContainer>
            <h3>Export</h3>
            <p>Y aquí las cosas</p>
            <Button size={"mid"}>Export image</Button>
            {/* <Popover.Close /> */}
            <Popover.Arrow />
          </PopoverContainer>
        </Popover.Root>

      </EngineHeaderItem>

    </EngineHeaderContainer>
  )
}
