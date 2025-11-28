import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-black pt-16 pb-5 px-1'>
      <div className='container grid grid-cols-3 mx-auto md:px-4 mb-10'>
        <div>
          <Link to='/'>
            <img className='w-28' src='/logo.svg' alt='KINK' />
          </Link>
          <div className='space-y-3 ml-2 mt-3'>
            <div className='text-white'>К оплате принимаем:</div>
            <div className='flex gap-3'>
              <img className='w-7 h-7' src='click.png' alt='click' />
              <img className='w-7 h-7' src='payme.png' alt='payme' />
              <img className='w-7 h-7' src='icons/card.svg' alt='card' />
              <img className='w-7 h-7' src='icons/wallet.svg' alt='wallet' />
            </div>
          </div>
        </div>
        <ul className='text-white space-y-5 text-sm'>
          <li>O KINK</li>
          <li>События</li>
          <li>Доставка</li>
          <li>Контакты</li>
          <li className='flex gap-3'>
            <img className='w-7 h-7' src='icons/facebook.svg' alt='facebook' />
            <img
              className='w-7 h-7'
              src='icons/instagram.svg'
              alt='instagram'
            />
            <img className='w-7 h-7' src='icons/telegram.svg' alt='telegram' />
          </li>
        </ul>
        <ul className='text-white text-sm space-y-5'>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='icons/location.svg' alt='location' />
              <h5 className='font-semibold'>Адрес</h5>
            </span>
            <p className='font-light'>ул.Паркент 283</p>
          </li>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='icons/calendar.svg' alt='calendar' />
              <h5 className='font-semibold'>График</h5>
            </span>
            <p className='font-light'>Работаем без выходных с 11:00 до 21:00</p>
          </li>
          <li className='space-y-2'>
            <span className='flex -ml-6 gap-1'>
              <img className='w-4' src='icons/call.svg' alt='call' />
              <h5 className='font-semibold'>Телефон</h5>
            </span>
            <p className='font-light'>(+998) 90 924 87 61</p>
          </li>
        </ul>
      </div>
      <p className='flex justify-center text-white text-xs'>
        Copyright © 2025 KINK. Все права защищены.
      </p>
    </footer>
  )
}
