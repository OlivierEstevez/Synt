import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import About from "./pages/about";
import Engine from "./Engine"
import MetaTool from "./MetaTool";
import "normalize.css"
import "./styles/global.css"

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} >
          <Route path="about" element={<About/>} />
        </Route>
        <Route path="engine" element={<Engine/>} />
        <Route path="metatool" element={<MetaTool/>} />
      </Routes>
    </BrowserRouter>,
  document.getElementById("root")
)