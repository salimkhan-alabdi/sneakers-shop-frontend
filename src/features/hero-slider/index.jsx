import React from 'react'

export default function HeroSlider() {
  return (
    <div className="relative flex justify-center overflow-hidden py-4">
      <img className="w-3xl" src="/heroimages/yeezy.png" alt="Yeezy" />
      <img
        className="absolute top-1/2 left-1/2 -z-1 w-4xl -translate-x-1/2 -translate-y-1/2 transform opacity-10"
        src="/heroimages/yeezylogo.png"
        alt="YeezyLogo"
      />
      <div className="absolute right-18 bottom-0">
        <p className="text-6xl font-bold">YEEZY</p>
        <span className="ml-16 text-3xl font-bold text-[#FF8E2E] italic">
          BOOST <span className="text-[#C4C4C4]">350 v2</span>
        </span>
      </div>
    </div>
  )
}
