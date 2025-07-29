import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import camerabg from "../assets/images/camerabg.jpg"

function Camera() {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  

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
  const bgStyle = {
    backgroundImage: `url(${camerabg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col bg-black/60 z-20" style={bgStyle}>

      {!url ? (
        <>
          <div className="sm:w-[350px] sm:h-[450px] rounded-xl shadow-lg">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
              forceScreenshotSourceSize={true}
              className="w-[350px] h-[450px] object-cover rounded-xl"
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={capturePhoto}
              className="font-bold bg-[#BB9D82] text-[#D3DDD9] pt-3 pb-3 pl-5 pr-5 rounded-xl mt-6"
            >
              Capture
            </button>
          </div>

        </>
      ) : (
        <>
          <div className="sm:w-[350px] sm:h-[450px] rounded-xl shadow-lg">

            <img src={url} alt="Screenshot" className="w-full h-full object-cover rounded-xl" />


          </div>
          <div className="w-full flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setUrl(null)}
              className="font-bold bg-[#BB9D82] text-[#D3DDD9] py-3 px-5 rounded-xl"
            >
              Retake
            </button>
            <button
              onClick={handleFinish}
              className="font-bold bg-[#3CC5D8] text-white pt-3 pb-3 pl-5 pr-5 rounded-xl"
            >
              Finish
            </button>
          </div>
        </>
      )}



    </div>
  );
}

export default Camera;
