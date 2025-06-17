import { useState } from 'react'
import Video from '../assets/images/vid.mp4'

function Home() {
    const [LetsGo, setLetsGo] = useState(false)

    return (
        <div className="flex flex-col max-w-[750px] w-full h-[100vh] relative mx-auto">
            <video className="w-full h-[100vh] absolute object-cover" autoPlay muted loop>
                <source src={Video} type='video/mp4' />
            </video>

            <header className="w-full h-screen inset-0 flex flex-col items-center justify-center mx-0">
                <nav
                    className={`relative w-[70vw] h-[60vh] mt-30 z-20 ${
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
                        
                        className="flex flex-col items-center gap-5 mb-10 z-50 translate-y-[-200px] animate-floaty2"
                    >
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TAKE A PHOTO
                        </button>
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            CHOOSE FROM GALLERY
                        </button>
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TRY SAMPLE PHOTO
                        </button>
                    </div>
                )}
            </header>


            
                
            
            
            

            {/* <header className="w-full inset-0 flex flex-col items-center justify-center absolute">
                <motion.h3
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: LetsGo ? -200 : 0, opacity: 1 }}
                    transition={{ duration: 1.5}}
                    className="mt-auto mb-8 font-bold text-5xl animate-bounce italic text-[#e0e0e3]"
                >
                    ODYSSEY82
                </motion.h3>

                {!LetsGo ? (
                    <button
                        onClick={() => setLetsGo(true)}
                        className="mb-20 bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl"
                    >
                        LET'S GO
                    </button>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="flex flex-col items-center gap-5 mb-10"
                    >
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TAKE A PHOTO
                        </button>
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            CHOOSE FROM GALLERY
                        </button>
                        <button className="w-[75vw] bg-[#777981] text-black font-bold italic pt-3 pr-10 pb-3 pl-10 rounded-2xl">
                            TRY SAMPLE PHOTO
                        </button>
                    </motion.div>
                )}
            </header> */}
        </div>
    )
}

export default Home
