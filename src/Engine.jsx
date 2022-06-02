// SIGNATURE
import engineSignature from "./utils/global/engineSignature"

// REACT
import { useState, useEffect, useRef } from "react"

// UI
import EngineHeader from "./components/Engine Parts/EngineHeader"
import EngineFooter from "./components/Engine Parts/EngineFooter"
import Button from "./components/UI/Button"
import Dropzone from "./components/UI/Dropzone"
import CanvasContainer, { CanvasPlaceholder } from "./components/Engine Parts/CanvasContainer"
import ControllersMainContainer, { ControllersContainer, Controller } from "./components/Engine Parts/Controllers"
import { ColorPicker, useColor } from "react-color-palette"
import "./styles/colorpicker.css"
import { ArcherContainer, ArcherElement } from 'react-archer'
import Zoom from "./components/Engine Parts/Zoom"
import Select from "./components/UI/Select"
import Slider from "./components/UI/Slider"
import LoadingOverlay from "./components/Engine Parts/LoadingOverlay"

// Essentia
import useEssentiaAnalyser from "./utils/engine/useEssentiaAnalyser"
import testObject from "./utils/engine/testObject.json"

// P5
import { ReactP5Wrapper } from "react-p5-wrapper"
import generators from "./sketch/generators"
import canvasToImage from "canvas-to-image"
import InputLabelContainer from "./components/UI/InputLabelContainer"
import ToggleSwitch from "./components/UI/Toggle"

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
    console.log(essentiaMagic.audioObject)

    if (didMount.current && testMode) {
      console.log(essentiaMagic.audioObject)
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
  const [size, setSize] = useState({ x: 700, y: 700 })
  const [transparentBg, setTransparentBg] = useState(false)
  const [UIVisibility, setUIVisibility] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [dataFixed, setDataFixed] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [curvature, setCurvature] = useState(0)

  const exportImage = (name, type) => {
    canvasToImage("defaultCanvas0", {
      name: name ? name : "artwork"
    })
  }

  const [threshold, setThreshold] = useState(0)
  const [divisions, setDivisions] = useState(16)

  return (
    <div className="App">

      {essentiaMagic.loading ? <LoadingOverlay /> : ""}

      <EngineHeader
        width={size.x}
        height={size.y}
        updateSize={(width, height) => setSize({ x: width, y: height })}
        updateBackground={value => setTransparentBg(value)}
        updateUIVisibility={value => setUIVisibility(value)}
        exportFunction={(name, type) => exportImage(name, type)}
      >
        <Select value={generator.name} onChange={e => setGenerator(generators.find(a => a.name == e.currentTarget.value))}>
          {generators.map((elem, index) => (
            <option key={index} value={elem.name}>{elem.name}</option>
          ))}
        </Select>

      </EngineHeader>

      <Zoom
        updateZoom={zoom => setZoomLevel(zoom)}
      // hidden={UIVisibility}
      />

      <ControllersMainContainer hidden={UIVisibility}>
        <ArcherContainer
          strokeColor="#ffffff"
          strokeWidth={1}
          // strokeDasharray={"8, 8"}
          startMarker={true}
          endMarker={true}
          offset={-4}
        >
          <ControllersContainer>
            <ArcherElement
              id="audio-decoder"
              relations={[{
                targetId: "data-modifier",
                targetAnchor: "left",
                sourceAnchor: "right",
                style: {
                  endShape: {
                    circle: {
                      radius: 4,
                      fillColor: "black",
                      strokeColor: "white",
                      strokeWidth: 0,
                    }
                  }
                }
              }]}
            >
              <Controller>
                <h4>Audio Decoder</h4>
                <Dropzone exportFile={setFile} />
              </Controller>
            </ArcherElement>

            <ArcherElement
              id="data-modifier"
              relations={[{
                targetId: "generator-settings",
                targetAnchor: "left",
                sourceAnchor: "right",
                style: {
                  endShape: {
                    circle: {
                      radius: 4,
                      fillColor: "black",
                      strokeColor: "white",
                      strokeWidth: 0,
                    }
                  }
                }
              }]}
            >
              <Controller>
                <h4>Data Modifier</h4>
                <InputLabelContainer label="Normalize data">
                  <ToggleSwitch onPressedChange={(value) => { setDataFixed(value) }}></ToggleSwitch>
                </InputLabelContainer>
              </Controller>
            </ArcherElement>

            <ArcherElement
              id="generator-settings"
            >
              <Controller>
                <h4>Generator Settings</h4>
                {/* <ColorPicker width={152} height={128} color={color} onChange={setColor} hideRGB hideHSV /> */}
                <InputLabelContainer label="Threshold">
                  <Slider defaultValue={[0]} max={10} step={0.5} onValueChange={e => setThreshold(e[0])}></Slider>
                </InputLabelContainer>
                <InputLabelContainer label="Divisions">
                  <Slider defaultValue={[16]} max={96} step={4} onValueChange={e => setDivisions(e[0])}></Slider>
                </InputLabelContainer>

                {generator.name == "Filmic" ? <InputLabelContainer label="Animate"><ToggleSwitch onPressedChange={(value) => { setAnimate(value) }}></ToggleSwitch></InputLabelContainer> : ""}
                {generator.name == "Cartographer" ?
                  <InputLabelContainer label="Curvature">
                    <Slider defaultValue={[100]} max={500} step={10} onValueChange={e => setCurvature(e[0])}></Slider>
                  </InputLabelContainer>
                  : ""}



              </Controller>
            </ArcherElement>
          </ControllersContainer>
        </ArcherContainer>
      </ControllersMainContainer>

      <CanvasContainer
        css={{
          transform: `translate(-50%, -50%) scale(${zoomLevel})`,
          borderRadius: 4 / zoomLevel
        }}
      >
        {essentiaMagic.audioObject.volume ?
          <ReactP5Wrapper
            sketch={generator.sketch}

            sizeX={size.x}
            sizeY={size.y}
            color={color}
            threshold={threshold}
            divisions={divisions}
            animate={animate}
            dataFixed={dataFixed}
            curvature={curvature}

            bpm={essentiaMagic.audioObject.bpm}
            volume={essentiaMagic.audioObject.volume}
            ticks={essentiaMagic.audioObject.ticks}
            signature={essentiaMagic.audioObject.signature}

          />
          : <CanvasPlaceholder><span>Drag an audio file on the editor to start playing</span></CanvasPlaceholder>
        }

      </CanvasContainer>

      <EngineFooter
        renderer={"Canvas 2D"}
        sizeW={size.x}
        sizeH={size.y}
      />

      <style>{`
        .App {
          ${transparentBg ? `background-color: #f5f5f5;
          background-image:  
        repeating-linear-gradient(45deg, #c9c9c9 25%, transparent 25%, transparent 75%, #c9c9c9 75%, #c9c9c9), 
        repeating-linear-gradient(45deg, #c9c9c9 25%, #f5f5f5 25%, #f5f5f5 75%, #c9c9c9 75%, #c9c9c9);
          background-position: 0 0, 10px 10px;
          background-size: 20px 20px;` : ""}
          height: 100vh;º
        }
      
      `}</style>

    </div>
  )
}