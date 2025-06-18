import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import Video from '../assets/images/vid.mp4'

function Home() {
    const [LetsGo, setLetsGo] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    const handleFileInput = useRef(null);

    const handleClick = () => {
        handleFileInput.current.click();
    };

    const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    
    if (file) {
        setIsLoading(true);
        const imagePreview = URL.createObjectURL(file)
        setTimeout(() => {
        // kasih delay dikit buat nunjukin loader
        navigate("/design", {
            state: {
            preview: imagePreview,
            imageFile: file,
            },
        });
        }, 2000);
   
        }
    };


    return isLoading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <ClipLoader size={80} color="#ffffff" />
                </div>
            ) : ( 
        <div className="flex flex-col max-w-[750px] w-full h-full relative mx-auto">
            
            <video className="w-full h-[90vh] top-0 left-0 overflow-x-hidden absolute object-cover" autoPlay muted loop>
                <source src={Video} type='video/mp4' />
            </video>

            <header className="w-full h-full inset-0 flex flex-col items-center justify-center mx-0">
                <nav
                    className={`relative w-[70vw] h-[60vh] z-20 ${
                        LetsGo ? "animate-floaty" : ""
                    }`}
                    >

                    <h3
                        className="mb-5 font-bold text-5xl text-center animate-bounce italic bottom-0 text-[#e0e0e3] absolute"
                    >
                        ODYSSEY82
                    </h3>
                
                </nav>
                {!LetsGo ? (
                    <button
                        onClick={() => setLetsGo(true)}
                        className="mb-20 bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl z-50"
                    >
                        LET'S GO
                    </button>
                ) : (
                    <div
                        
                        className="flex flex-col items-center mb-10 z-50 translate-y-[-200px] animate-floaty2 gap-0"
                    >
                        <button onClick={handleClick} className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TAKE A PHOTO
                        </button>
                        <label>
                            <input
                            className='hidden'
                            type="file"
                            accept="image/*"
                            capture="environment"
                            autoFocus
                            ref={handleFileInput}
                            onChange={handleImageChange}
                            />
                        </label>                        
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic mt-5 mb-5 pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            CHOOSE FROM GALLERY
                        </button>
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TRY SAMPLE PHOTO
                        </button>
                    </div>
                )}
            </header>
        </div>
    )
}

export default Home
