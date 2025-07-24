import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homes from "./pages/Homes"
import Design from "./pages/Design"
import Sample from "./pages/Sample"
import Home from "./pages/Home"
import Brush from "./components/Brush"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Homes/>}/>
        <Route path="/design" element={<Design/>}/>
        <Route path="/sample" element={<Sample/>}/>
        <Route path="/brush" element={<Brush/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App