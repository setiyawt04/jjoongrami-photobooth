import Move from "./Move"

export default function Sticker({sticker, onClick}) {
  
  return (
    <div
      onClick={onClick} 
      className="w-15 h-15 bg-amber-100 rounded-md flex items-center justify-center shadow-md">
        
        
        <img 
        className="max-w-full max-h-full object-contain cursor-pointer"
        src={sticker.img.src}
        alt={sticker.img.alt}
        
      />
    </div>
  )
}
