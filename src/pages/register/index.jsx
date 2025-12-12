import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { instance } from '@/api/axios.js'
import Button from '@/components/button/index.jsx'

export default function RegisterPage() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await instance.post('users/register/', {
        username,
        password,
        password2: password,
      })

      // сохраняем токены если backend их выдает
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)

      navigate('/profile')
    } catch (err) {
      console.log(err.response?.data)
      alert('Ошибка регистрации')
      const messages = Object.values(err.response?.data).flat().join('\n')
      alert(messages)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-sm bg-white p-6 border'>
        <h2 className='text-2xl font-bold text-gray-900 text-center mb-6'>
          Регистрация
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm text-black mb-1'>
              Имя пользователя
            </label>
            <input
              type='text'
              className='w-full px-3 py-2 border outline-none'
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm text-black mb-1'>Пароль</label>
            <input
              type='password'
              className='w-full px-3 py-2 border outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className='block text-sm text-black mb-1'>
              Повторите пароль
            </label>
            <input
              type='password'
              className='w-full px-3 py-2 border outline-none'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          <Button disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </Button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-4'>
          Уже есть аккаунт?{' '}
          <a href='/login' className='text-black underline'>
            Войти
          </a>
        </p>
      </div>
    </div>
  )
}
