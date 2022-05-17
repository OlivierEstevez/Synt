// SIGNATURE
import engineSignature from "./utils/global/engineSignature"

// REACT
import { useState, useEffect, useRef } from "react"

// UI
import EngineHeader from "./components/Engine Parts/EngineHeader"
import EngineFooter from "./components/Engine Parts/EngineFooter"
import Panel from "./components/UI/Panel"
import Button from "./components/UI/Button"
import Dropzone from "./components/UI/Dropzone"
import CanavasContainer from "./components/Engine Parts/CanvasContainer"
import { ColorPicker, useColor } from "react-color-palette"
import "./styles/colorpicker.css"

// Essentia
import useEssentiaAnalyser from "./utils/engine/useEssentiaAnalyser"
import testObject from "./utils/engine/testObject.json"

// P5
import { ReactP5Wrapper } from "react-p5-wrapper"
import generators from "./sketch/generators"
import saveCanvas from "./utils/p5 functions/saveCanvas"

export default function Engine() {

  const testMode = false

  const [generator, setGenerator] = useState(generators[0])

  const [file, setFile] = useState(null)
  const essentiaMagic = useEssentiaAnalyser(file)
  if (testMode) {
    essentiaMagic.audioObject = JSON.parse(JSON.stringify(testObject))
  }

  const didMount = useRef(false)

  // First time
  useEffect(() => {
    engineSignature()
  }, [])

  // Essentia AudioObject
  useEffect(() => {
    if (didMount.current && testMode) {
      // console.log(essentiaMagic.audioObject)
    } else {
      didMount.current = true
    }
  }, [essentiaMagic.audioObject])

  // Loading
  useEffect(() => {
    if (essentiaMagic.loading) {
      console.log("loading...")
    }
  }, [essentiaMagic.loading])


  const [color, setColor] = useColor("hex", "#ffffff")
  const [size, setSize] = useState({x: 700, y: 700})

  return (
    <div className="App">

      <EngineHeader
        width={size.x}
        height={size.y}
        updateSize={(width, height) => setSize({x: width, y: height})}
      >
        <select value={generator.name} onChange={e => setGenerator(generators.find(a => a.name == e.currentTarget.value))}>
          {generators.map((elem, index) => (
            <option key={index} value={elem.name}>{elem.name}</option>
          ))}
        </select>
      </EngineHeader>

      <Panel>
       
        <Dropzone exportFile={setFile} />

        <ColorPicker width={152} height={128} color={color} onChange={setColor} hideRGB hideHSV />

      </Panel>

      <CanavasContainer>
        <ReactP5Wrapper
          sketch={generator.sketch}

          sizeX={size.x}
          sizeY={size.y}
          color={color}

          volume={essentiaMagic.audioObject.volume}
          ticks={essentiaMagic.audioObject.ticks}

        />
      </CanavasContainer>

      <EngineFooter
        renderer={"Canvas 2D"}
        sizeW={size.x}
        sizeH={size.y}
      />

    </div>
  )
}