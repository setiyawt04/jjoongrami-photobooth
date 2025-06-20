import { useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";

function Design() {
    const location = useLocation()
    const navigate = useNavigate()

    const { preview } = location.state || {};
    if (!preview) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 text-center">
        <p className="text-lg mb-4">No image found. Please take a photo first.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }


    return (
          <div className="w-full h-[92vh] bg-[#2a2d32] overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
            <div className="flex justify-between items-center w-full h-[12vh] p-5">
              <button className="text-xl italic font-bold text-[#777981]">Back</button>
              <button className="text-xl italic font-bold text-[#e0e0e3]">Save</button>
            </div>
            <div className="w-[85vw] h-[60vh] overflow-hidden mx-auto rounded-2xl sm:w-[20vw] sm:h-[55vh] border-4 border-[#777981]">
              <img className="w-full h-full object-cover" src={preview} alt="" />
            </div>
              
            <div className="flex justify-end items-center w-[85vw] sm:w-[20vw] mx-auto h-[7vh] mt-3 text-[#e0e0e3] text-xl gap-6">
              <FontAwesomeIcon icon={faAngleLeft} />
              <FontAwesomeIcon icon={faAngleRight} />
              <FontAwesomeIcon icon={faArrowRotateLeft}/>
            </div>
            <div className="flex justify-between items-center w-[85vw] sm:w-[20vw] mx-auto gap-5">
              <button className="bg-[#777981] w-[70vw]  pt-3 pr-8 pl-8 pb-3 text-xl italic font-bold rounded-2xl">Sticker</button>
              <button className="bg-[#777981] w-[15vw] p-3 rounded-2xl"><FontAwesomeIcon className="text-xl italic font-bold text-[#e0e0e3]" icon={faPaintBrush}/></button>
            </div>
          </div>

        
    )
}

export default Design