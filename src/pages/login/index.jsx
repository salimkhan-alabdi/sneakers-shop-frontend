import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '@/api/axios.js'
import Button from '@/components/button/index.jsx'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { lang } = useParams()
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await instance.post('users/login/', {
        username,
        password,
      })

      // сохраняем токены
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      // редирект после успешного входа
      navigate(`/${lang}/profile`)
    } catch (err) {
      console.log(err.response?.data)
      alert('Неверный логин или пароль')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-sm bg-white border p-6'>
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-6'>
          Войти в аккаунт
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm text-black mb-1'>
              Имя пользователя
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border outline-none focus:ring-1 transition-all'
              value={username}
              placeholder='Ваше имя'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm text-black mb-1'>Пароль</label>
            <input
              type='password'
              className='w-full px-3 py-2 border outline-none focus:ring-1 transition-all'
              value={password}
              placeholder='••••••••'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button disabled={loading} className='w-full'>
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-4'>
          Нет аккаунта?{' '}
          <a href='/register' className='text-black underline'>
            Регистрация
          </a>
        </p>
      </div>
    </div>
  )
}
