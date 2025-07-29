import { useState, useRef } from "react"
import bg from "../assets/images/bg.jpg"
import video from "../assets/images/video1.mp4"
import { useNavigate } from "react-router-dom";

function Home() {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const liClassStyle = 'bg-[#7BA1C8] text-center rounded-xl text-white pt-3 pb-3 text-base font-medium cursor-pointer'

    //func for button Let's Go
    const [letsGo, setLetsGo] = useState(false)

    //input photo
    const inputPhoto = useRef()

    //handle choose from file
    const navigate = useNavigate();
    const handleFromFile = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = e.target.result
            localStorage.setItem("savedPreview", preview);

            navigate("/design", { state: {preview}})
        }
        reader.readAsDataURL(file)
    }

    return (
        
        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
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
                                <li
                                    className={liClassStyle}
                                    onClick={(e) => {navigate('/camera')}}
                                >
                                    Take A Photo
                                </li>
                                

                                <li className={liClassStyle} onClick={()=>{inputPhoto.current && inputPhoto.current.click()}}>Choose From Gallery</li>
                                <input
                                    ref={inputPhoto}
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{display:"none"}}
                                    onChange={handleFromFile}
                                />
                                <li className={liClassStyle} onClick={()=>{navigate('/sample')}}>Try Sample Photo</li>
                            </ul>

                        </nav>

                    )}
                </header>
            </div>
        </div>
    )
}

export default Home