import { useLocation, useNavigate } from "react-router-dom"

function Design() {
    const location = useLocation()
    const navigate = useNavigate()

    const { preview } = location.state || {};
    if (!preview) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 text-center">
        <p className="text-lg mb-4">No image found. Please take a photo first.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-xl"
        >
          Back to Home
        </button>
      </div>
    );
  }


    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen p-10">
      <img src={preview} alt="Preview" className="w-[300px] rounded-xl border" />
      
    </div>
        </>
    )
}

export default Design