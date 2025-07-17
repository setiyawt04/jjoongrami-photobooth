import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: { ideal: 1920 },
  height: { ideal: 1080 },
    facingMode: "user"
  };

  return (
    <>
      {!imgSrc ? (
        <>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <h2>Preview hasil:</h2>
          <img src={imgSrc} alt="Screenshot" style={{ width: '300px' }} />
          <br />
          <button onClick={() => setImgSrc(null)}>Retake</button>
        </>
      )}
    </>
  );
}

export default Camera;
