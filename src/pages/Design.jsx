import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush, faXmark } from "@fortawesome/free-solid-svg-icons";
import data from "../sticker.js"
import Sticker from "../components/Sticker";
import Move from "../components/Move.jsx";
import html2canvas from "html2canvas";
import bg from "../assets/images/276.jpg";
import bgdesign from "../assets/images/design-bg.jpg"
import { ReactSketchCanvas } from "react-sketch-canvas";
import Brush from "../components/Brush.jsx";


function Design() {

  const [colorBrush, setColorBrush] = useState("");

  const bgStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const bgDesign = {
    backgroundImage: `url(${bgdesign})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  const [showBrush, setShowBrush] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [preview, setPreview] = useState(() => {
    return location.state?.preview || localStorage.getItem("savedPreview");
  });
  const [loading, setLoading] = useState(!preview);

  useEffect(() => {
    if (!preview) {
      const timer = setTimeout(() => {
        const saved = localStorage.getItem("savedPreview");
        if (saved) {
          setPreview(saved);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }, 300); 

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [preview]);


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
  const brushRef = useRef(null);
  const [exportSize, setExportSize] = useState({ width: 720, height: 1280 });
  const [eraseMode, setEraseMode] = useState(false);

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

  const handleSticker = () => {
    setShowSticker(prev => !prev);
  };


  const handleSaveImage = async () => {
    const uiElement = canvasRef.current;

    // Screenshot elemen dengan scale tinggi (biar hasil tajem)
    const originalCanvas = await html2canvas(uiElement, {
      backgroundColor: null,
      useCORS: true,
      scale: 4, // ✅ Ubah ini jadi 3 atau 4
      removeContainer: true
    });

    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");

    const exportWidth = 720;
    const exportHeight = 1280;

    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;

    const scale = Math.min(exportWidth / originalCanvas.width, exportHeight / originalCanvas.height);
    const offsetX = (exportWidth - originalCanvas.width * scale) / 2;
    const offsetY = (exportHeight - originalCanvas.height * scale) / 2;

    ctx.save();
    ctx.scale(scale, scale);
    ctx.drawImage(originalCanvas, offsetX / scale, offsetY / scale);
    ctx.restore();

    const link = document.createElement("a");
    link.download = "photobooth-preview-HD.jpg";
    link.href = exportCanvas.toDataURL("image/jpeg", 1.0);
    link.click();
  };

  const handleDelete = (index) => {
    setStickers((prev) => prev.filter((_, i) => i !== index));
  }

  const handleEraserClick = () => {
    setEraseMode(true);
    brushRef.current?.eraseMode(true);
  };

  const handleUndoClick = () => {
    brushRef.current?.undo();
  };

  const handleRedoClick = () => {
    brushRef.current?.redo();
  };

  const handleClearClick = () => {
    brushRef.current?.clearCanvas();
  };

  const stickerElements = data.map((sticker) => (
    <Sticker
      key={sticker.id}
      sticker={sticker}
      onClick={() => handleSelect(sticker)}
    />
  ));

  return (
    <>
      {showSticker && (
        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgDesign}>
          <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[40vw] sm:w-[50vw] sm:h-[90vh]" style={bgStyle}>
            <h1 className="absolute text-2xl text-black top-6 left-6">Pick your sticker!</h1>
            <button onClick={() => setShowSticker(false)} className="cursor-pointer">
              <FontAwesomeIcon icon={faXmark} className="absolute top-6 right-6 text-red-500 text-3xl" />
            </button>
            <div className='w-[85vw] h-[75vh] sm:w-[26vw] sm:h-[70vh] absolute top-20 left-1/2 -translate-x-1/2  rounded-2xl border-blue-100 border-2' style={bgDesign}>
              <div className="absolute flex gap-3 overflow-y-auto max-h-[62vh] mt-5 mb-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 rounded-xl flex-wrap justify-center items-center">
                {stickerElements}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgDesign}>
        <div
          className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[40vw] sm:w-[50vw] sm:h-[90vh]" style={bgStyle}
          onClick={(e) => {
            if (!e.target.closest(".sticker-box")) setActiveIndex(null);
          }}
        >
          <div className="flex justify-between items-center w-full h-[10vh] p-5">
            <button className="text-xl italic font-bold text-[#CD784C]" onClick={()=>{navigate('/')}}>Back</button>
            <button onClick={handleSaveImage} className="text-xl italic font-bold text-[#8FD9FB]">Save</button>
          </div>

          <div
            ref={canvasRef}
            className="relative sm:w-[350px] sm:h-[400px] overflow-hidden mx-auto w-[500px] h-[1080px]"
          >
            <img
              src={preview}
              alt="photo"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",

                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
            <ReactSketchCanvas
              ref={brushRef}
              width="100%"
              height="100%"
              strokeWidth={4}
              strokeColor={colorBrush}
              canvasColor="transparent"
              style={{
                border: "none"
              }}
              className="absolute top-0 left-0 z-10"
            />

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
                  {activeIndex === index && (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="absolute p-1 -top-0 -right-7 bg-blue-300 text-white text-lg cursor-pointer z-50 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                    />
                  )}
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

          {showBrush && (
            <Brush
              colorBrush={colorBrush}
              setColorBrush={setColorBrush}
              cross={() => setShowBrush(false)}
              eraser={handleEraserClick}
              undo={handleUndoClick}
              redo={handleRedoClick}
              clear={handleClearClick}
            />
          )}

          <div className="flex justify-between items-center w-[85vw] sm:w-[26vw] mx-auto gap-5 mt-7">
            <button className="bg-[#8FD9FB] w-[60vw] pt-3 pr-8 pl-8 pb-3 text-[#CD784C] text-xl italic font-bold rounded-xl" onClick={handleSticker}>Sticker</button>
            <button className="bg-[#8FD9FB] w-[10vw] p-3 rounded-xl" onClick={() => { setShowBrush(true) }}>
              <FontAwesomeIcon className="text-xl italic font-bold text-[#CD784C]" icon={faPaintBrush} />

            </button>

          </div>

        </div>
      </div>
    </>
  );
}

export default Design;