import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '@/api/axios'
import Button from '@/components/button'
import { useAuthStore } from '@/store/useAuthStore.js'

export default function ProfilePage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { lang } = useParams()
  // Получаем текущие данные пользователя
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await instance.get('users/profile/')
        setUsername(res.data.username || '')
      } catch (err) {
        console.error(err)
        setError('Не удалось загрузить данные')
      }
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      await instance.patch('users/profile/update/', {
        username: username,
      })
      alert('Имя успешно обновлено!')
    } catch (err) {
      console.error(err)
      setError('Ошибка при обновлении имени')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    // Опционально: Очистить состояние в Zustand, если не очищается по умолчанию
    const { logout: clearZustand } = useAuthStore.getState()
    clearZustand()

    // ПЕРЕНАПРАВЛЕНИЕ НА ГЛАВНУЮ СТРАНИЦУ
    navigate(`/${lang}/`)
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Профиль</h1>

      {error && <p className="mb-2 text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-semibold">Имя</label>
        <input
          type="text"
          className="w-full rounded border px-3 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? 'Сохраняем...' : 'Сохранить'}
        </Button>

        <Button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Выйти
        </Button>
      </div>
    </div>
  )
}
