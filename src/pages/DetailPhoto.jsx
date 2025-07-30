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
                        <button className="text-xl italic font-bold text-[#CD784C]" onClick={() => navigate('/sample')}>Back</button>
                        <p>Ready</p>
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
                    <button className="font-bold bg-[#BB9D82] text-[#D3DDD9] pt-3 pb-3 pl-20 pr-20 cursor-pointer rounded-xl mt-6" onClick={handleTryIt}>Try It</button>
                </div>
            </div>
        </div>
    )
}

export default DetailPhoto