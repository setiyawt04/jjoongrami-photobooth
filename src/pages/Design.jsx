import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import data from "../sticker.js"
import Sticker from "../components/Sticker";

function Design() {
    let preview = location.state?.preview;
    if (!preview) {
      preview = localStorage.getItem("savedPreview");
    }


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

  const [showSticker, setShowSticker] = useState(false)

  function handleSticker() {
    setShowSticker(true)
  }

  const stickerElements =  data.map((sticker) => {
    return (
      <>
        <Sticker
        key={sticker.id}
        sticker={sticker}
        />
      </>
  )})

return showSticker ? ( 
        <div className="relative w-full h-full bg-menu overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
          <FontAwesomeIcon icon={faXmark} className="absolute top-3 right-6 text-red-500 text-3xl"/>
          <div className='w-[20vw] h-[62vh] absolute top-15 bg-amber-400 z-20 rounded-2xl border-amber-100 border-2'>
            <div className="absolute flex gap-3 pt-5 overflow-y-auto max-h-[58vh] scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent flex-wrap justify-center items-center">
              {stickerElements}
            </div>
            
          </div>
          <div className="absolute bottom-10 flex justify-between items-center w-[85vw] sm:w-[20vw] mx-auto gap-5">
            <button className="bg-[#777981] w-[70vw]  pt-3 pr-8 pl-8 pb-3 text-xl italic font-bold rounded-2xl" onClick={()=> handleSticker()}>Sticker</button>
            <button className="bg-[#777981] w-[15vw] p-3 rounded-2xl"><FontAwesomeIcon className="text-xl italic font-bold text-[#e0e0e3]" icon={faPaintBrush}/></button>
          </div>
        </div> 
        ) : (
        <div className="w-full h-[92vh] bg-menu overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
        
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
            <button className="bg-[#777981] w-[70vw]  pt-3 pr-8 pl-8 pb-3 text-xl italic font-bold rounded-2xl" onClick={()=> handleSticker()}>Sticker</button>
            <button className="bg-[#777981] w-[15vw] p-3 rounded-2xl"><FontAwesomeIcon className="text-xl italic font-bold text-[#e0e0e3]" icon={faPaintBrush}/></button>
          </div>
        </div>
        
      )
}

export default Design