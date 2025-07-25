import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import camerabg from "../assets/images/camerabg.jpg"

const videoConstraints = {
  width: 540,
  facingMode: "environment"
};

function Camera() {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const videoConstraints = {
    width: { ideal: 1920 },
    height: { ideal: 1080 },
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
        <div className="sm:w-[25vw] max-w-[480px] sm:h-[65vh] rounded-xl shadow-lg">
          {!url ? (
            <>
            <Webcam
            ref={webcamRef}
            audio={true}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            onUserMedia={onUserMedia}
            forceScreenshotSourceSize={true}
            className="w-full h-full object-cover rounded-xl"
          />
          <button onClick={capturePhoto}>Capture</button>
          </>
          ):(
            <>
            
              <img src={url} alt="Screenshot" className="w-full h-full object-cover rounded-xl"/>
          
            <button onClick={() => setUrl(null)}>Retake</button>
            </>
          )}
          
        </div>
      </div>
    </>
  );
}

export default Camera;
