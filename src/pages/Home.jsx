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
                <div className={`flex flex-col sm:aspect-[9/16] mx-auto sm:items-center sm:max-w-xs h-[92vh] relative ${LetsGo ? "bg-menu" : ""}`}>
                    {!LetsGo && (
                        <video className="w-full h-[92vh] top-0 left-0 overflow-x-hidden absolute object-cover sm:rounded-2xl sm:border-3 sm:border-[#777981]" autoPlay muted loop>
                            <source src={Video} type='video/mp4' />
                        </video>
                    )}
                    

                    <header className="w-full h-full inset-0 flex flex-col items-center justify-center mx-0">
                        <nav
                            className={`w-screen h-[55vh] relative z-20`}
                            >

                            <h3
                                className={`absolute bottom-[-100px] sm:bottom-[-40px] w-full font-bold text-5xl text-center animate-bounce italic text-[#e0e0e3] ${
                                LetsGo && "animate-floaty sm:mb-0 mb-20"
                            }`}
                            >
                                ODYSSEY82
                            </h3>
                        
                        </nav>
                        {!LetsGo ? (
                            <button
                                onClick={() => setLetsGo(true)}
                                className="mt-30 sm:mt-15 bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl z-50"
                            >
                                LET'S GO
                            </button>
                        ) : (
                            <div
                                
                                className="flex sm:w-full flex-col items-center mt-10 z-50 translate-y-[-150px] animate-floaty2 gap-0"
                            >
                                <button onClick={handleClick} className="sm:w-[20vw] w-[70vw] bg-[#777981] text-sm text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
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
                                <button className="sm:w-[20vw] w-[70vw] bg-[#777981] text-sm text-black font-bold italic mt-5 mb-5 pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                                    CHOOSE FROM GALLERY
                                </button>
                                <button className="sm:w-[20vw] text-sm w-[70vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                                    TRY SAMPLE PHOTO
                                </button>
                            </div>
                        )}
                    </header>
                </div>
    )
}

export default Home
