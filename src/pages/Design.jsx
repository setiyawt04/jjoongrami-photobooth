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
import { handleClickSound } from "../utils/sound";



function Design() {

  const [colorBrush, setColorBrush] = useState("");
  const navigate = useNavigate()


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

  const location = useLocation();
  const [preview, setPreview] = useState(() => {
    const previewFromState = location.state?.preview;

    if (previewFromState) {
      localStorage.setItem("savedPreview", JSON.stringify(previewFromState));
      return previewFromState;
    }

    const savedPreview = localStorage.getItem("savedPreview");
    return savedPreview ? JSON.parse(savedPreview) : null;
  });


  useEffect(() => {
    return () => {
      localStorage.removeItem("savedPreview");
    };
  }, []);



  if (!preview) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 text-center">
        <p className="text-lg mb-4">No image found. Please take a photo first.</p>
        <button
          onClick={() => {
            localStorage.removeItem("savedPreview");
            navigate("/"); handleClickSound();
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
  const [eraseMode, setEraseMode] = useState(false);



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

    const canvas = await html2canvas(uiElement, {
      useCORS: true,
      backgroundColor: '#000',
      scale: 3,
    });

    // Download
    const link = document.createElement("a");
    link.download = "jjoongrami-photobooth.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };



  const handleDelete = (index) => {
    setStickers((prev) => prev.filter((_, i) => i !== index));
  }

  const handleEraserClick = () => {
    setEraseMode(true);
    brushRef.current?.eraseMode(true);
  };

  const handleBrushClick = () => {
    setEraseMode(false);
    brushRef.current?.eraseMode(false); // paksa balik ke brush mode
    setShowBrush(true);
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
  const [canvasSize, setCanvasSize] = useState('350px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setCanvasSize({ width: '350px', height: '400px' });
      } else if (window.innerWidth > 768) {
        setCanvasSize({ width: '325px', height: '450px' });
      } else {
        setCanvasSize({ width: '320px', height: '500px' })
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgDesign}>
        <div
          className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[42vw] sm:w-[55vw] sm:h-[90vh]" style={bgStyle}
          onClick={(e) => {
            if (!e.target.closest(".sticker-box")) setActiveIndex(null);
          }}
        >
          {showSticker && (
            <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[45vw] sm:w-[55vw] sm:h-[90vh]" style={bgStyle}>
              <h1 className="absolute text-2xl animate-bounce text-[#FEE5A9ff] -rotate-4 top-6 left-6 font-waterlily">A little art never hurts ✨ </h1>
              <button onClick={() => { setShowSticker(false); handleClickSound() }} className="cursor-pointer">
                <FontAwesomeIcon icon={faXmark} className="font-bold hover:translate-y-2 absolute top-6 right-6 text-red-500 text-3xl" />
              </button>
              <div className='w-[90vw] h-[75vh] lg:w-[27vw] lg:h-[72vh] absolute top-20 left-1/2 -translate-x-1/2  rounded-2xl border-blue-100 border-2' style={bgDesign}>
                <div className="absolute flex gap-3 overflow-y-auto max-h-[69vh] lg:max-h-[65vh] mt-5 mb-5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 rounded-xl flex-wrap justify-center items-center">
                  {stickerElements}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center w-full h-[10vh] p-5">
            <button className="text-2xl font-bold font-waterlily text-[#1c61af] cursor-pointer hover:-translate-x-2 hover:text-[#013B7Dff] font-outline2" onClick={() => { navigate('/'); handleClickSound() }}>Back</button>
            <button onClick={() => { handleSaveImage(); handleClickSound() }} className="text-2xl font-bold font-waterlily text-[#fde9d6] font-outline cursor-pointer hover:translate-x-2 hover:text-[#e08575]">Save</button>
          </div>

          <div
            ref={canvasRef}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: '#000',
              margin: 'auto',
              borderRadius: '15px'
            }}
          >
            <img
              src={preview}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '100%',
                maxHeight: '100%',
                margin: 'auto'
              }}
              crossOrigin="anonymous"
              alt=""
            />

            <ReactSketchCanvas
              ref={brushRef}
              width="100%"
              height="100%"
              strokeWidth={6}
              strokeColor={colorBrush}
              canvasColor="transparent"
              style={{
                border: "none",
                pointerEvents: showBrush ? "auto" : "none"
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
                      className="absolute p-1 -top-0 -right-7 bg-blue-300 text-white text-lg cursor-pointer pointer-events-auto z-50 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                      onTouchStart={(e) => {
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

          {showBrush ? (
            <Brush
              colorBrush={colorBrush}
              setColorBrush={setColorBrush}
              cross={() => setShowBrush(false)}
              eraser={handleEraserClick}
              undo={handleUndoClick}
              redo={handleRedoClick}
              clear={handleClearClick}
              disableEraser={handleBrushClick}
            />
          ) : (
            <div className="flex justify-between items-center w-[85vw] sm:w-[26vw] mx-auto gap-2 sm:gap-5 mt-8">
              <button className="bg-[#58727Fff] hover:bg-[#3a525e] hover:translate-y-2 w-[65vw] lg:w-[60vw] p-3 text-[#FEE5A9ff] font-waterlily text-2xl rounded-xl cursor-pointer" onClick={() => { handleSticker(); handleClickSound() }}>Stickers</button>
              <button className="bg-[#58727Fff] hover:bg-[#3a525e] hover:translate-y-2 w-[15vw] lg:w-[10vw] p-3 text-2xl font-waterlily rounded-2xl cursor-pointer" onClick={() => { setShowBrush(true); handleClickSound() }}>
                <FontAwesomeIcon className="text-xl italic text-[#FEE5A9ff] font-waterlily" icon={faPaintBrush} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Design;