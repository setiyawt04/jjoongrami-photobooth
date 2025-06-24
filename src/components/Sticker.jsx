import React from 'react'

export default function Sticker(props) {
  return (
    <>
        
            <div className="w-15 h-15 bg-amber-100 rounded-md flex items-center justify-center shadow-md">
                <img 
                cclassName="max-w-full max-h-full object-contain"
                src={props.sticker.img.src}
                alt={props.sticker.img.alt}
            />
            </div>
        
        
    </>
  )
}
