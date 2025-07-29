import { useState } from "react";
import sampleBg from "../assets/images/1913.jpg"
import bg from "../assets/images/bg.jpg";
import data from "../photoSample.js"
import { useNavigate } from "react-router-dom"

function Sample() {
    const createBgStyle = (image) => ({
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    })

    const navigate = useNavigate()
    const bgStyle = createBgStyle(bg);
    const bgSample = createBgStyle(sampleBg)

    const handleClick = (id) => {
        navigate(`/detail/${id}`)
    }
    return (
        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
            <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[40vw] sm:w-[50vw] sm:h-[90vh]">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col z-20" style={bgSample}>
                    <div className="flex justify-between items-center w-full h-[10vh] px-5">
                        <button className="text-xl italic font-bold text-[#CD784C]" onClick={() => navigate('/')}>Back</button>
                        <p>Ready</p>
                    </div>
                    <div className="sm:w-[350px] sm:h-[450px] rounded-xl shadow-lg p-5 overflow-x-auto">
                        <div className="flex flex-wrap gap-4">
                            {data.map(image => (
                                <div key={image.id} className="w-[calc(50%-0.5rem)] cursor-pointer" onClick={()=> handleClick(image.id)}>
                                    <img
                                        src={image.img.src}
                                        alt={image.img.alt}
                                        className="rounded-xl w-full h-[200px] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sample;