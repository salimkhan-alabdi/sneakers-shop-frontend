import React from "react"

export default function HeroSlider() {
  return (
    <div className='flex justify-center relative overflow-hidden'>
      <img className='w-3xl' src='/heroimages/yeezy.png' alt='Yeezy' />
      <img
        className='absolute -z-1 w-4xl opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        src='/heroimages/yeezylogo.png'
        alt='YeezyLogo'
      />
      <div className='absolute bottom-0 right-18'>
        <p className='text-6xl font-bold'>YEEZY</p>
        <span className='text-3xl text-[#FF8E2E] font-bold italic ml-16'>
          BOOST <span className='text-[#C4C4C4]'>350 v2</span>
        </span>
      </div>
    </div>
  )
}
