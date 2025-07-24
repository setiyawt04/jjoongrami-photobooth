import { ReactSketchCanvas } from "react-sketch-canvas";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Brush({ colorBrush, setColorBrush, cross }) {
  
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
  return (
    <div className="bg-pink-100 sm:w-[350px] sm:h-[80px] pl-4 pr-4 pt-2 pb-2 rounded-xl mx-auto mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-pink-300 mb-3 font-bold">Pick Your Color!</h1>
        <FontAwesomeIcon icon={faXmark} className="text-red-500 text-xl" onClick={cross} />
      </div>
      <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 scroll-smooth">
        <div className=" w-[30vw] flex items-center min-w-max gap-2">
          {
            colors.map((color, id) => (
              <button
                key={id}
                onClick={() => setColorBrush(color)}
                style={{
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '1px solid white',
                  width: "24px",
                  height: "24px",
                }}
              />
            ))
          }
        </div>
      </div>
      

    </div>
  );
}
