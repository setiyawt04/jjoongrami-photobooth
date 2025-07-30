import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import camerabg from "../assets/images/9.jpg"
import bg from "../assets/images/bg.jpg";
import { handleClickSound } from "../utils/sound";

function Camera() {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);


  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc)
  }, []);

  const onUserMedia = (e) => {
    console.log(e);
  };

  //preview photo
  const navigate = useNavigate()
  const handleFinish = () => {
    if (url) {
      localStorage.setItem("savedPreview", url);
      navigate("/design", {
        state: { preview: url }
      });
    }
  }

  const videoConstraints = {
    width: 350,
    height: 450,
    facingMode: "user"
  };

  const createBgStyle = (image) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  });

  const bgStyle = createBgStyle(bg);
  const bgCamera = createBgStyle(camerabg);


  return (
    <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
      <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[42vw] sm:w-[55vw] sm:h-[90vh]">

        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-black/60 z-20" style={bgCamera}>

          {!url ? (
            <>
              <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[10vh] px-5">
                <button className="text-2xl font-bold font-waterlily text-[#E45E9D] cursor-pointer font-outline2 hover:-translate-x-2 hover:text-[#CD784C]" onClick={() => {navigate('/'); handleClickSound()}}>Back</button>
                <p className="text-xl font-waterlily text-[#f1e0d0] rotate-4 animate-bounce">Ready, set… say cheeseee! 📸</p>
              </div>
              <div className="lg:mt-5 w-[330px] h-[530px] sm:w-[320px] md:w-[310px] lg:w-[350px] sm:h-[400px] rounded-xl shadow-lg">
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  onUserMedia={onUserMedia}
                  forceScreenshotSourceSize={true}
                  className="w-full h-full lg:w-[350px] lg:h-[400px] object-cover rounded-xl"
                />
              </div>
              <div className="flex w-full justify-center items-center">
                <button
                  onClick={()=>{capturePhoto(); handleClickSound()}}
                  className="cursor-pointer font-waterlily text-xl bg-[#f185b8] hover:-translate-y-2 hover:bg-[#E45E9D] text-white pt-3 pb-3 pl-20 pr-20 rounded-xl mt-6"
                >
                  Capture
                </button>
              </div>

            </>
          ) : (
            <>
              <div className="absolute animate-bounce top-3 left-0 flex-col flex justify-center items-center w-full h-[12vh] text-[#f1e0d0] rotate-6 font-waterlily text-xl  px-5">
                <p className="text-center w-full">Boom! 🎉 Nailed it!</p>
                <p className="text-center w-full">Your vibe just got captured ✨</p>
              </div>
              <div className="w-[330px] h-[530px] lg:w-[350px] lg:h-[400px] rounded-xl shadow-lg mt-10">
                
                <img src={url} alt="Screenshot" className="w-full h-full object-cover rounded-xl" />


              </div>
              <div className="w-full flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => {setUrl(null); handleClickSound()}}
                  className="font-waterlily bg-[#f185b8] cursor-pointer hover:-translate-y-2 hover:bg-[#E45E9D] lg:text-xl text-[#D3DDD9] py-3 px-10 rounded-xl"
                >
                  Retake
                </button>
                <button
                  onClick={()=>{handleFinish(); handleClickSound()}}
                  className="bg-[#f77f6f] hover:-translate-y-2 font-waterlily hover:bg-[#DC6555] cursor-pointer  lg:text-xl text-[#D3DDD9] py-3 px-12 rounded-xl"
                >
                  Finish
                </button>
              </div>
            </>
          )}



        </div>
      </div>
    </div>
  );
}

export default Camera;
