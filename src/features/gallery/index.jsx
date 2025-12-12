import React, { useEffect, useState } from 'react'

export default function ProductGallery({ images, onClose }) {
  const [activeImage, setActiveImage] = useState(null)

  // Когда галерея открывается — ставим 1-й
  useEffect(() => {
    if (images?.length > 0) {
      setActiveImage(images[0])
    }
  }, [images])

  if (!activeImage) return null

  return (
    <div className='fixed bg-white top-0 left-0 w-full h-full z-10'>
      <button
        className='absolute top-10 right-10 cursor-pointer text-2xl'
        onClick={onClose}
      >
        ✖
      </button>

      {/* Главное изображение */}
      <div className='flex gap-2 justify-center items-center h-[70vh]'>
        <img
          className='max-w-full max-h-full object-contain w-[600px]'
          src={activeImage.image}
          alt=''
        />
      </div>

      {/* Миниатюры */}
      <div className='flex gap-3 justify-center transition-all'>
        {images.map((image, i) => (
          <img
            key={i}
            src={image.image}
            className={`
              w-32 h-32 object-contain border 
              cursor-pointer 
              ${
                activeImage.image === image.image
                  ? 'border-black'
                  : 'border-transparent'
              }
            `}
            onClick={() => setActiveImage(image)} // ← Теперь правильно
          />
        ))}
      </div>
    </div>
  )
}
