import { BrowserRouter, Routes, Route } from "react-router-dom"
import Design from "./pages/Design"
import Sample from "./pages/Sample"
import Home from "./pages/Home"
import Brush from "./components/Brush"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/design" element={<Design/>}/>
        <Route path="/sample" element={<Sample/>}/>
        <Route path="/brush" element={<Brush/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App