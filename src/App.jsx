import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homes from "./pages/Homes"
import Design from "./pages/Design"
import Sample from "./pages/Sample"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Homes/>}/>
        <Route path="/design" element={<Design/>}/>
        <Route path="/sample" element={<Sample/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App