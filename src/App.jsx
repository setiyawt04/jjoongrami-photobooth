import Home from "./pages/Home"
import Design from "./pages/Design"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Home />}/>
          {/* <Route path="/sample" element={<Sample />}/>
          <Route path="/sample-preview" element={<SamplePreview />}/> */}
          <Route path="/design" element={<Design/>}/>
          {/* <Route path="/result" element={<Result/>}/> */}

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
