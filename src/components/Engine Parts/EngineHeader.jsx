import React, { createRef, useState, useEffect } from "react"
import SYNTLogo from "../extra/SYNTLogo"
import Button from "../UI/Button"
import Input, { LinkedInputsComponent } from "../UI/Input"
import PopoverContainer, { FlexCenter, Flex } from "../UI/PopoverContainer"
import ToggleSwitch, { ToggleIcon } from "../UI/Toggle"
import Divider from "../UI/Divider"
import InputLabelContainer from "../UI/InputLabelContainer"
import Select from "../UI/Select"
import Text from "../UI/Text"

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
  gap: 12,

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

  const [size, setSize] = useState({ x: props.width, y: props.height })
  const [fixedSize, setFixedSize] = useState(false)
  const [transparentBg, setTransparentBg] = useState(false)
  const [UIVisibility, setUIVisibility] = useState(false)

  useEffect(() => {
    if (props.updateSize)
      props.updateSize(size.x, size.y)
  }, [size])

  useEffect(() => {
    if (props.updateBackground)
      props.updateBackground(transparentBg)
  }, [transparentBg])

  useEffect(() => {
    if (props.updateUIVisibility)
      props.updateUIVisibility(UIVisibility)
  }, [UIVisibility])

  let widthInput = createRef()
  let heightInput = createRef()
  let nameInput = createRef()

  return (
    <EngineHeaderContainer>

      <EngineHeaderItem>
        <SYNTLogo type="Engine" />
      </EngineHeaderItem>

      <EngineHeaderItem justify={"center"}>
        {props.children}
      </EngineHeaderItem>

      <EngineHeaderItem justify={"right"}>
        <Button size={"small"}>Help</Button>
        <Popover.Root>
          <Popover.Trigger asChild><Button outline={true}>Settings</Button></Popover.Trigger>
          {/* <Popover.Anchor /> */}
          <PopoverContainer>
            <div>
              <h3>Artboard</h3>
              <FlexCenter>
                <Flex>
                  <InputLabelContainer label="Width">
                    <Input size={4} ref={widthInput} type={"text"} pattern="[0-9]*" defaultValue={size.x} placeholder={"width"} units="px"
                      onChange={e => {
                        if (fixedSize)
                          heightInput.current.value = e.target.value
                      }}
                    ></Input>
                  </InputLabelContainer>
                  <InputLabelContainer label="Height">
                    <Input size={4} ref={heightInput} type={"text"} pattern="[0-9]*" defaultValue={size.y} placeholder={"height"} units="px"
                      onChange={e => {
                        if (fixedSize)
                          widthInput.current.value = e.target.value
                      }}
                    ></Input>
                  </InputLabelContainer>
                </Flex>
                <LinkedInputsComponent>
                  <ToggleIcon
                    pressed={fixedSize}
                    onPressedChange={(value) => {
                      const minSize = Math.min(widthInput.current.value, heightInput.current.value)
                      widthInput.current.value = minSize
                      heightInput.current.value = minSize
                      setFixedSize(value)
                    }}
                  >
                    <svg width="11" height="6" viewBox="0 0 11 6" fill="#DBDBDB" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.55 3C9.55 3.855 8.855 4.55 8 4.55L6 4.55L6 5.5L8 5.5C9.38 5.5 10.5 4.38 10.5 3C10.5 1.62 9.38 0.5 8 0.5L6 0.5L6 1.45L8 1.45C8.855 1.45 9.55 2.145 9.55 3ZM7.5 2.5L3.5 2.5L3.5 3.5L7.5 3.5L7.5 2.5ZM3 5.5L5 5.5L5 4.55L3 4.55C2.145 4.55 1.45 3.855 1.45 3C1.45 2.145 2.145 1.45 3 1.45L5 1.45L5 0.5L3 0.499999C1.62 0.499999 0.5 1.62 0.5 3C0.5 4.38 1.62 5.5 3 5.5Z" />
                    </svg>
                  </ToggleIcon>
                </LinkedInputsComponent>
                <Button outline size={"mid"} onClick={() => (widthInput.current.value != "" && widthInput.current.value != "") ?
                  setSize({ x: widthInput.current.value, y: heightInput.current.value })
                  : console.log("no hay nada!")}>Update Size</Button>
              </FlexCenter>
            </div>
            <Divider />
            <div>
              <h3>Editor</h3>
              <InputLabelContainer label="Transparent BG">
                <ToggleSwitch
                  pressed={transparentBg}
                  onPressedChange={(value) => setTransparentBg(value)}
                />
              </InputLabelContainer>
              <InputLabelContainer label="Hide UI">
                <ToggleSwitch
                  pressed={UIVisibility}
                  onPressedChange={(value) => setUIVisibility(value)}
                />
              </InputLabelContainer>
            </div>
            {/* <Popover.Close /> */}
            <Popover.Arrow />
          </PopoverContainer>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild><Button>Export</Button></Popover.Trigger>
          {/* <Popover.Anchor /> */}
          <PopoverContainer>
            <h3>Export</h3>
            <InputLabelContainer label="Name">
              <Input ref={nameInput} type={"text"} placeholder={"artwork-name"}></Input>
            </InputLabelContainer>
            <InputLabelContainer label="Format">
              <Select>
                <option value={"png"}>png</option>
                <option value={"jpg"}>jpg</option>
              </Select>
            </InputLabelContainer>
            <Text size={"small"}>Size: {size.x}px x {size.y}px <br></br>(Adjust on settings menu)</Text>
            <Button size={"mid"} onClick={() => props.exportFunction(nameInput.current.value)}>Export image</Button>
            {/* <Popover.Close /> */}
            <Popover.Arrow />
          </PopoverContainer>
        </Popover.Root>
      </EngineHeaderItem>

    </EngineHeaderContainer>
  )
}
