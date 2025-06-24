import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import data from "../sticker.js"
import Sticker from "../components/Sticker";
import Move from "../components/Move.jsx";
import { useRef, useEffect } from "react";

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
  const [selectedSticker, setSelectedSticker] = useState([])
  const stickerRef = useRef(null);

  
  const handleSelect = (sticker) => {
  const newRef = React.createRef();
    setSelectedSticker(prev => [
      ...prev,
      { ...sticker, ref: newRef }
    ]);
    setShowSticker(false);
  };


  useEffect(() => {
  console.log("Selected Sticker (from useEffect):", selectedSticker);
}, [selectedSticker]);


  function handleSticker() {
    setShowSticker(prev => !prev);
  }



  const stickerElements =  data.map((sticker) => {
    return (
    
        <Sticker
          key={sticker.id}
          sticker={sticker}
          onClick={() => handleSelect(sticker)}
        />
      
  )})

return showSticker ? ( 
        <div className="relative w-full sm:h-full h-screen bg-menu items-center overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
          <h1 className="absolute text-2xl  text-white top-6 left-6">Hi</h1>
          <button onClick={()=>setShowSticker(false)} className="cursor-pointer"><FontAwesomeIcon icon={faXmark} className="absolute top-6 right-6 text-red-500 text-3xl"/></button>
            <div className='w-[85vw] h-[75vh] sm:w-[20vw] sm:h-[70vh] absolute top-20 bg-amber-400 z-20 rounded-2xl border-amber-100 border-2'>
              <div className="absolute flex gap-3 overflow-y-auto max-h-[62vh] mt-5 mb-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 rounded-xl flex-wrap justify-center items-center">
                {stickerElements}
              </div>
            </div>
        </div> 
        ) : (
        <div className="w-full sm:h-full h-screen bg-menu overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
        
        <div className="flex justify-between items-center w-full h-[12vh] p-5">
            <button className="text-xl italic font-bold text-[#777981]">Back</button>
            <button className="text-xl italic font-bold text-[#e0e0e3]">Save</button>
          </div>
          <div className="relative w-[85vw] h-[60vh] overflow-hidden mx-auto rounded-2xl sm:w-[20vw] sm:h-[55vh] border-4 border-[#777981]">
  {/* Layer dasar: Gambar preview */}
  <img className="w-full h-full object-cover" src={preview} alt="" />

  {/* Layer atas: Tempat sticker */}
        {selectedSticker.map((sticker, index) => (
        <div
          key={index}
          className="absolute z-50"
          style={{ top: `${60 + index * 20}px`, left: `${40 + index * 20}px` }}
        >
          <div
            ref={sticker.ref}
            className="w-32 h-32 relative pointer-events-none select-none"
          >
            <img
              src={sticker.img?.src}
              alt={sticker.img?.alt}
              className="w-full h-full object-contain"
            />
          </div>
          <Move targetRef={sticker.ref} />
        </div>
      ))}


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