import { faXmark, faUndo, faRedo, faEraser, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleClickSound } from "../utils/sound";

export default function Brush({ setColorBrush, cross, eraser, undo, redo, clear, disableEraser }) {
  
  const colors = [
    "#FFB6C1", // light pink
    "#FFD700", // golden yellow
    "#A3E4D7", // mint green
    "#E6E6FA", // lavender
    "#87CEFA", // sky blue
    "#FADADD", // pastel pink
    "#FFFACD", // lemon chiffon
    "#B0E0E6", // powder blue
    "#FFDEAD", // navajo white
    "#D8BFD8", // thistle purple
    "#FEC8D8", // cotton candy
    "#C1E1C1", // tea green
    "#FFDAC1", // peach puff
    "#B5EAD7", // mint milk
  ]
  const iconStyle = 'text-[#FFA755ff] font-bold hover:translate-y-0.5 text-base'
  return (
    <div className="w-[320px] h-[90px] bg-[#FEE5A9ff] lg:w-[350px] bottom-10 lg:h-[80px] pl-4 pr-4 pt-2 pb-2 rounded-xl mx-auto mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[#FFA755ff] text-base font-waterlily mb-2">Pick Your Color 🎨</h1>
        <div className="flex justify-between items-center mb-2 gap-3">
          <FontAwesomeIcon icon={faUndo} className={iconStyle} onClick={undo}/>
          <FontAwesomeIcon icon={faRedo} className={iconStyle} onClick={redo}/>
          <FontAwesomeIcon icon={faEraser} className={iconStyle} onClick={eraser}/>
          <FontAwesomeIcon icon={faRefresh} className={iconStyle} onClick={clear}/>
          <FontAwesomeIcon icon={faXmark} className="text-red-500 hover:translate-y-0.5 font-bold text-base" onClick={()=>{cross(); handleClickSound()}} />
        </div>
        
      </div>
      <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-[#FEE5A9ff] scrollbar-track-[#f8d686] scroll-smooth">
        <div className="w-[30vw] flex items-center min-w-max gap-2">
          {
            colors.map((color, id) => (
              <button
                key={id}
                onClick={() => {setColorBrush(color); disableEraser(); }}
                style={{
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '1px solid white',
                  width: "24px",
                  height: "24px",
                  cursor: 'pointer',
                }}
                className="transition duration-200 hover:grayscale"
              />
            ))
          }
        </div>
      </div>
      

    </div>
  );
}
