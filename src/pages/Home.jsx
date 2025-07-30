import { useState, useRef, useEffect } from "react"
import bg from "../assets/images/bg.jpg"
import video from "../assets/images/video1.mp4"
import logo from "../assets/images/logo.png"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import music from "../assets/music/cute.mp3"
import { handleClickSound } from "../utils/sound";

function Home() {
    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const liClassStyle = 'bg-[#f7c477] font-waterlily font-outline text-center font-bold  rounded-xl text-white pt-3 pb-3 text-base lg:text-xl hover:-translate-y-1 hover:bg-[#ffbd59] cursor-pointer'

    const [volume, setVolume] = useState(true)
    const audioRef = useRef()

    const toggleVolume = () => {
        if (audioRef.current) {
            if (volume) {
                audioRef.current.muted = true
                setVolume(false)
            } else {
                audioRef.current.muted = false
                audioRef.current.play()
                setVolume(true)
            }
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.2
        }
    }, []);

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

            navigate("/design", { state: { preview } })
        }
        reader.readAsDataURL(file)
    }

    return (

        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
            <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[45vw] sm:w-[55vw] sm:h-[90vh]">
                <div>
                    <audio ref={audioRef} src={music} autoPlay loop />
                    {
                        volume ? (<FontAwesomeIcon icon={faVolumeHigh} className="absolute top-6 right-6 text-[#ffbd59] z-50 cursor-pointer text-2xl" onClick={toggleVolume} />)
                            : (<FontAwesomeIcon icon={faVolumeMute} className="absolute top-6 right-6 text-red-400 z-50 cursor-pointer text-2xl" onClick={toggleVolume} />)
                    }
                </div>
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={video}
                >

                </video>

                <header className="absolute top-30 left-0 flex w-full h-full justify-center pt-30 items-center flex-col">

                    {!letsGo ? (
                        <>
                            <img src={logo} alt="logo" className="animate-bouncy max-h-[100px]" />
                            <button className="rounded-xl bg-[#f7c477] cursor-pointer text-white pt-3 pb-3 pl-10 pr-10 lg:text-2xl font-outline text-base font-bold font-waterlily mt-4 hover:-translate-y-2 hover:bg-[#ffbd59]" onClick={() => {
                                setLetsGo(true);
                                handleClickSound();
                            }}>Let's Go</button>
                        </>

                    ) : (

                        <nav className="animate-floaty">
                            <img src={logo} alt="logo" className="animate-bouncy max-h-[100px]" />
                            <ul className="flex flex-col gap-3 lg:w-[20vw] mx-auto mt-5">
                                <li
                                    className={liClassStyle}
                                    onClick={(e) => { navigate('/camera'); handleClickSound()}}
                                >
                                    Take A Photo
                                </li>


                                <li className={liClassStyle} onClick={() => { inputPhoto.current && inputPhoto.current.click(); handleClickSound() }}>Choose From Gallery</li>
                                <input
                                    ref={inputPhoto}
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{ display: "none" }}
                                    onChange={handleFromFile}
                                />
                                <li className={liClassStyle} onClick={() => { navigate('/sample'); handleClickSound() }}>Try Sample Photo</li>
                            </ul>

                        </nav>

                    )}
                </header>
            </div>
        </div>
    )
}

export default Home