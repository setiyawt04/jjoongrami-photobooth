import { useState, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import bg from "../assets/images/bg.jpg"
import video from "../assets/images/video1.mp4"
import { PulseLoader } from "react-spinners";

function Homes() {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const liClassStyle = 'bg-[#7BA1C8] text-center rounded-xl text-white pt-3 pb-3 text-base font-medium cursor-pointer'

    //func for button Let's Go
    const [letsGo, setLetsGo] = useState(false)

    //take photo
    const photoInput = useRef(null)
    const photoSave = () => {
        photoInput.current.click();
    }

    //preview photo
    const [preview, setPreview] = useState("")
    const navigate = useNavigate()
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    //final photo
    const MAX_WIDTH = 500; // or whatever size you want

    const photo = (e) => {
        setTimeout(() => {
            const userPhoto = e.target.files[0];
            if (!userPhoto) return;

            console.log(userPhoto);
            setIsLoading(true);
            setFileName(userPhoto.name || "photo-" + Date.now() + ".jpg");

            const reader = new FileReader();

            reader.onloadend = () => {
                const base64 = reader.result;

                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");

                    let width = img.width;
                    let height = img.height;

                    // Resize logic: maintain aspect ratio
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    const resizedBase64 = canvas.toDataURL("image/jpeg", 0.8); // quality 80%

                    // Save resized image
                    localStorage.setItem("savedPreview", resizedBase64);
                    setPreview(resizedBase64);
                    setIsLoading(false);

                    // If you wanna navigate after:
                    navigate("/design", { state: { preview: resizedBase64 } });
                };

                img.onerror = () => {
                    console.error("⚠️ Failed to load image for resizing");
                    setIsLoading(false);
                };

                img.src = base64;
            };

            reader.readAsDataURL(userPhoto);
        }, 500)
    };



    return (
        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
            {isLoading && (
                <div className="fixed inset-0 bg-white/80 z-50 flex flex-col items-center justify-center">
                    <PulseLoader color="#3A2724" size={15} />
                    <p className="mt-4 text-[#3A2724] text-sm font-medium">Processing your photo...</p>
                </div>
            )}
            <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[40vw] sm:w-[50vw] sm:h-[90vh]">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={video}
                ></video>

                <header className="absolute top-30 left-0 flex w-full h-full justify-center pt-30 items-center flex-col">
                    {!letsGo ? (
                        <>

                            <h1 className="text-2xl text-[#3A2724] font-bold animate-bounce">Jjoongrami's Photobooth</h1>
                            <button className="rounded-xl bg-[#7BA1C8] cursor-pointer text-white pt-3 pb-3 pl-8 pr-8 text-base font-bold mt-4" onClick={() => setLetsGo(true)}>Let's Go</button>
                        </>

                    ) : (


                        <nav className="animate-floaty">
                            <h1 className="text-2xl mb-7 text-[#3A2724] font-bold animate-bounce">Jjoongrami's Photobooth</h1>
                            <ul className="flex flex-col gap-3">
                                <li className={liClassStyle} >
                                    <button type="button" onClick={photoSave}>
                                        Take A Photo
                                    </button>
                                    <input
                                        type="file"
                                        ref={photoInput}
                                        accept="image/*"
                                        capture="user"
                                        style={{ display: 'none' }}
                                        onChange={photo}
                                    />
                                </li>


                                <li className={liClassStyle}>Choose From Gallery</li>
                                <li className={liClassStyle}>Try Sample Photo</li>
                            </ul>

                        </nav>

                    )}
                </header>
            </div>
        </div>
    )
}

export default Homes