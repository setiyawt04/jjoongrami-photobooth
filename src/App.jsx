import Home from "./pages/Home"
import Design from "./pages/Design"
import bgImage from "./assets/images/bg.jpg"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
 
  return (
    <div className="sm:min-h-screen sm:flex sm:items-center sm:justify-center bg-white" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover'}}>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Home />}/>
            {/* <Route path="/sample" element={<Sample />}/>
            <Route path="/sample-preview" element={<SamplePreview />}/> */}
            <Route 
              path="/design"
              element={

                  <Design />
               
              }/>
            {/* <Route path="/result" element={<Result/>}/> */}

        </Routes>
        
      </BrowserRouter>
    </div>

  )
}

export default App
