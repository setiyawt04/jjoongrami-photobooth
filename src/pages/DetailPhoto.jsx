import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import sampleBg from "../assets/images/1913.jpg"
import bg from "../assets/images/bg.jpg";
import data from "../photoSample.js"

function DetailPhoto() {
    const createBgStyle = (image) => ({
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    })

    const navigate = useNavigate()
    const { id } = useParams()
    const selectedImage = data.find(image => image.id == parseInt(id));

    const handleTryIt = () => {
        if (selectedImage) {
            navigate('/design', { state: { preview: selectedImage.img.src } });
            console.log("Navigating to design with:", selectedImage);

        }
    }

    const bgStyle = createBgStyle(bg);
    const bgSample = createBgStyle(sampleBg)
    return (
        <div className="sm:w-full sm:h-screen flex items-center justify-center" style={bgStyle}>
            <div className="relative overflow-hidden sm:rounded-3xl w-full h-screen lg:w-[30vw] md:w-[50vw] sm:w-[55vw] sm:h-[90vh]">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col z-20" style={bgSample}>
                    <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[10vh] px-5">
                        <button className="text-2xl font-bold font-waterlily text-[#e95b42] font-outline2 hover:text-[#d33b20] cursor-pointer hover:-translate-x-2 hover:text-[#013B7Dff]" onClick={() => {navigate('/sample'); handleClickSound()}}>Back</button>
                        <p className="text-base lg:text-xl font-waterlily text-yellow-50 animate-bounce">Jjoongrami is in the frame! 💛</p>
                    </div>
                    <div className="w-[330px] h-[530px] lg:w-[350px] lg:h-[400px] rounded-xl shadow-lg">
                        {!selectedImage ? (
                            <p>Gambar tidak ditemukan</p>
                        ) : (
                            <img
                                src={selectedImage.img.src}
                                alt={selectedImage.img.alt}
                                className="rounded-xl w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <button className="bg-[#85943d] hover:bg-[#67722E] hover:translate-y-2 font-waterlily text-xl text-white px-35 lg:px-37 py-3 cursor-pointer rounded-xl mt-6" onClick={handleTryIt}>Try It</button>
                </div>
            </div>
        </div>
    )
}

export default DetailPhoto