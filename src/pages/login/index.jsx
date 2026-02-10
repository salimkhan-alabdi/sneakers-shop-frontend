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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm border bg-white p-6">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Войти в аккаунт
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-black">
              Имя пользователя
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 transition-all outline-none focus:ring-1"
              value={username}
              placeholder="Ваше имя"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-black">Пароль</label>
            <input
              type="password"
              className="w-full border px-3 py-2 transition-all outline-none focus:ring-1"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button disabled={loading} className="w-full">
            {loading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Нет аккаунта?{' '}
          <a href="/register" className="text-black underline">
            Регистрация
          </a>
        </p>
      </div>
    </div>
  )
}
