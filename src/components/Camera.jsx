import React, { useRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import camerabg from "../assets/images/camerabg.jpg"

function Camera() {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);
  
  function cropImageCenter(base64Image, cropWidth, cropHeight, callback) {
  const img = new Image();
  img.src = base64Image;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext("2d");

    const sx = (img.width - cropWidth) / 2;
    const sy = (img.height - cropHeight) / 2;

    ctx.drawImage(img, sx, sy, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    const croppedDataUrl = canvas.toDataURL("image/png");
    callback(croppedDataUrl);
  };
}

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    
    cropImageCenter(imageSrc, 350, 400, (croppedImage) => {
    setUrl(croppedImage);
  });
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
        state: { preview: url  }
      });
    }
  }

  const videoConstraints = {
    width: 350,
    height: 400,
    facingMode: "user"
  };
  const bgStyle = {
    backgroundImage: `url(${camerabg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
  return (
    <>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 z-20" style={bgStyle}>
        <div className="sm:w-[350px] sm:h-[400px] rounded-xl shadow-lg">
          {!url ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
                forceScreenshotSourceSize={true}
                className="w-[350px] h-[400px] object-cover rounded-xl"
              />
              {/* <button onClick={capturePhoto} className="translate-x-1/2 left-1/2 font-bold bg-[#3CC5D8] text-[#D3DDD9] pt-3 pb-3 pl-5 pr-5 rounded-xl mt-4 ">Capture</button> */}
              <div className="relative w-full h-[200px]">
                <button
                  onClick={capturePhoto}
                  className="absolute left-1/2 translate-x-[-50%] font-bold bg-[#BB9D82] text-[#D3DDD9] pt-3 pb-3 pl-5 pr-5 rounded-xl mt-4"
                >
                  Capture
                </button>
              </div>

            </>
          ) : (
            <>

              <img src={url} alt="Screenshot" className="w-full h-full object-cover rounded-xl" />
              <div className="w-full h-[80px] flex justify-center items-center gap-4">
                <button
                  onClick={() => setUrl(null)}
                  className="font-bold bg-[#BB9D82] text-[#D3DDD9] pt-3 pb-3 pl-5 pr-5 rounded-xl"
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
      </div>
    </>
  );
}

export default Camera;
