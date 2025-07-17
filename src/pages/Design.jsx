import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowRotateLeft, faPaintBrush, faXmark } from "@fortawesome/free-solid-svg-icons";
import data from "../sticker.js"
import Sticker from "../components/Sticker";
import Move from "../components/Move.jsx";
import html2canvas from "html2canvas";

function Design() {
  const navigate = useNavigate(); // ← ini yang kamu cari
  const location = useLocation();

  let preview = location.state?.preview;
  if (!preview) {
    preview = localStorage.getItem("savedPreview");
  }

  if (!preview) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 text-center">
        <p className="text-lg mb-4">No image found. Please take a photo first.</p>
        <button
          onClick={() => {
            localStorage.removeItem("savedPreview");
            navigate("/");
          }}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }


  const [showSticker, setShowSticker] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const canvasRef = useRef(null);
  const exportRef = useRef(null);
  const [exportSize, setExportSize] = useState({ width: 360, height: 500 });

  useEffect(() => {
    if (canvasRef.current) {
      const w = canvasRef.current.offsetWidth;
      const h = canvasRef.current.offsetHeight;
      setExportSize({ width: w, height: h });
    }
  }, []);

  const handleSelect = (sticker) => {
    const newRef = React.createRef();
    const newSticker = {
      ...sticker,
      ref: newRef,
      position: { top: 60 + stickers.length * 20, left: 40 + stickers.length * 20 },
      width: 128,
      height: 128,
      transform: "translate(0px, 0px) rotate(0deg)",
    };

    setStickers(prev => [...prev, newSticker]);
    setShowSticker(false);
    setTimeout(() => {
      setActiveIndex(stickers.length);
    }, 0);
  };

  function handleSticker() {
    setShowSticker(prev => !prev);
  }

  const handleSaveImage = async () => {
    setActiveIndex(null); // tutup kotak edit
    await new Promise((r) => setTimeout(r, 50)); // delay biar UI update

    if (!exportRef.current) return;
    const canvas = await html2canvas(exportRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "my-design.png";
    link.click();
  };

  const stickerElements = data.map((sticker) => (
    <Sticker
      key={sticker.id}
      sticker={sticker}
      onClick={() => handleSelect(sticker)}
    />
  ));

  return showSticker ? (
    <div className="relative w-full sm:h-full h-screen bg-menu items-center overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]">
      <h1 className="absolute text-2xl text-white top-6 left-6">Hi</h1>
      <button onClick={() => setShowSticker(false)} className="cursor-pointer">
        <FontAwesomeIcon icon={faXmark} className="absolute top-6 right-6 text-red-500 text-3xl" />
      </button>
      <div className='w-[85vw] h-[75vh] sm:w-[20vw] sm:h-[70vh] absolute top-20 bg-amber-400 z-20 rounded-2xl border-amber-100 border-2'>
        <div className="absolute flex gap-3 overflow-y-auto max-h-[62vh] mt-5 mb-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 rounded-xl flex-wrap justify-center items-center">
          {stickerElements}
        </div>
      </div>
    </div>
  ) : (
    <div
      className="w-full sm:h-full h-screen bg-menu overflow-y-hidden flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs sm:rounded-2xl sm:border-3 sm:border-[#777981]"
      onClick={(e) => {
        if (!e.target.closest(".sticker-box")) setActiveIndex(null);
      }}
    >
      <div className="flex justify-between items-center w-full h-[12vh] p-5">
        <button className="text-xl italic font-bold text-[#777981]">Back</button>
        <button onClick={handleSaveImage} className="text-xl italic font-bold text-[#e0e0e3]">Save</button>
      </div>

      <div
        ref={canvasRef}
        className="relative w-[85vw] h-[60vh] overflow-hidden mx-auto rounded-2xl sm:w-[20vw] sm:h-[55vh] border-2 border-[#777981]"
      >
        <img className="w-full h-full object-cover" src={preview} alt="" />

        {stickers.map((sticker, index) => (
          <div
            key={index}
            className="absolute z-50 sticker-box"
            style={{
              top: `${sticker.position.top}px`,
              left: `${sticker.position.left}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
          >
            <div
              ref={sticker.ref}
              className="relative select-none"
              style={{
                width: `${sticker.width}px`,
                height: `${sticker.height}px`,
                transform: sticker.transform || "translate(0px, 0px)",
              }}
            >
              <img
                src={sticker.img?.src}
                alt={sticker.img?.alt}
                className="w-full h-full object-contain "
              />
            </div>
            {activeIndex === index && (
              <Move
                targetRef={sticker.ref}
                onUpdateTransform={(newTransform) => {
                  setStickers((prev) => {
                    const updated = [...prev];
                    updated[index] = {
                      ...updated[index],
                      transform: newTransform,
                    };
                    return updated;
                  });
                }}
                onUpdateSize={(width, height) => {
                  setStickers((prev) => {
                    const updated = [...prev];
                    updated[index] = {
                      ...updated[index],
                      width,
                      height,
                    };
                    return updated;
                  });
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        ref={exportRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: `${exportSize.width}px`,
          height: `${exportSize.height}px`,
          overflow: "hidden",
          backgroundColor: "white",
          zIndex: -9999,
        }}
      >
        <img
          src={preview}
          alt="Preview"
          crossOrigin="anonymous"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {stickers.map((sticker, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${sticker.position.top}px`,
              left: `${sticker.position.left}px`,
              width: `${sticker.width}px`,
              height: `${sticker.height}px`,
              transform: sticker.transform,
              transformOrigin: "center",
            }}
          >
            <img
              src={sticker.img?.src}
              alt={sticker.img?.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end items-center w-[85vw] sm:w-[20vw] mx-auto h-[7vh] mt-3 text-[#e0e0e3] text-xl gap-6">
        <FontAwesomeIcon icon={faAngleLeft} />
        <FontAwesomeIcon icon={faAngleRight} />
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </div>
      <div className="flex justify-between items-center w-[85vw] sm:w-[20vw] mx-auto gap-5">
        <button className="bg-[#777981] w-[70vw] pt-3 pr-8 pl-8 pb-3 text-xl italic font-bold rounded-2xl" onClick={handleSticker}>Sticker</button>
        <button className="bg-[#777981] w-[15vw] p-3 rounded-2xl">
          <FontAwesomeIcon className="text-xl italic font-bold text-[#e0e0e3]" icon={faPaintBrush} />
        </button>
      </div>
    </div>
  );
}

export default Design;