import React, { useEffect, useState } from 'react'

export default function ProductGallery({ images, onClose }) {
  const [activeImage, setActiveImage] = useState(() => images?.[0] || null)

  // Update active image when images prop changes
  useEffect(() => {
    if (images?.length > 0 && !activeImage) {
      setActiveImage(images[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  if (!activeImage) return null

  return (
    <div className="fixed top-0 left-0 z-10 h-full w-full bg-white">
      <button
        className="absolute top-10 right-10 cursor-pointer text-2xl"
        onClick={onClose}
      >
        ✖
      </button>

      {/* Главное изображение */}
      <div className="flex h-[70vh] items-center justify-center gap-2">
        <img
          className="max-h-full w-[600px] max-w-full object-contain"
          src={activeImage.image}
          alt={activeImage.image}
        />
      </div>

      {/* Миниатюры */}
      <div className="flex justify-center gap-3 transition-all">
        {images.map((image, i) => (
          <img
            key={i}
            src={image.image}
            className={`h-32 w-32 cursor-pointer border object-contain ${activeImage.image === image.image
              ? 'border-black'
              : 'border-transparent'
              } `}
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>
    </div>
  )
}
