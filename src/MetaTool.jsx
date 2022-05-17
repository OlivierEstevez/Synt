import React from 'react'
import EngineHeader from './components/Engine Parts/EngineHeader'
import { ReactP5Wrapper } from "react-p5-wrapper"
import Metatool from './sketch/MetatoolSketch'
import CanavasContainer from './components/Engine Parts/CanvasContainer'

export default function MetaTool() {
  return (
    <div>
        <EngineHeader/>
        <CanavasContainer>
          <ReactP5Wrapper
              sketch={Metatool}
          />
        </CanavasContainer>
    </div>
  )
}