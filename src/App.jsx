// REACT
import { useState, useEffect, useRef } from "react"
import { Outlet, Link } from "react-router-dom"
import WebHeader from "./components/Web Parts/WebHeader"

function App() {

  return (
    <div className="App">
      <WebHeader/>
      <Outlet />
    </div>
  )
}

export default App