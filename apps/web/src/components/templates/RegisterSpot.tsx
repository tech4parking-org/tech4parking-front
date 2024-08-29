'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface SpotData {
  name: string
  latitude: number
  longitude: number
  availability: string
}

interface AlertProps {
  message: string
  type: 'success' | 'error'
}

const Alert: React.FC<AlertProps> = ({ message, type }) => (
  <div className={`${type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded relative mb-4`} role="alert">
    <span className="block sm:inline">{message}</span>
  </div>
)

export const RegisterSpot: React.FC = () => {
  const router = useRouter()
  const [spotData, setSpotData] = useState<SpotData>({
    name: '',
    latitude: 0,
    longitude: 0,
    availability: 'disponível',
  })
  const [alert, setAlert] = useState<AlertProps | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSpotData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) || 0 : value,
    }))
  }

  const validateForm = (): boolean => {
    if (!spotData.name.trim() || spotData.latitude === 0 || spotData.longitude === 0) {
      setAlert({ message: 'Por favor, preencha todos os campos corretamente.', type: 'error' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const response = await axios.post('https://API_GATEWAY_REMOVED/prod/spots', spotData)
      setAlert({ message: `Vaga criada com sucesso! Redirecionando...`, type: 'success' })
      
      // Aguarda 2 segundos antes de redirecionar
      setTimeout(() => {
        router.push('/list-spots')
      }, 2000)
    } catch (error) {
      console.error('Erro ao criar vaga:', error)
      setAlert({ message: 'Erro ao criar vaga. Por favor, tente novamente.', type: 'error' })
    }
  }

  return (
    <div className="max-w-md mt-10">
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit} className="bg-gray-25 rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nome da vaga"
            name="name"
            value={spotData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="latitude"
            type="number"
            step="any"
            placeholder="Latitude"
            name="latitude"
            value={spotData.latitude}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="longitude"
            type="number"
            step="any"
            placeholder="Longitude"
            name="longitude"
            value={spotData.longitude}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
            Disponibilidade
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="availability"
            name="availability"
            value={spotData.availability}
            onChange={handleInputChange}
            required
          >
            <option value="disponível">Disponível</option>
            <option value="indisponível">Indisponível</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary-500 shadow-md w-[400px] hover:bg-yellow-700 text-black font-semibold mt-8 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Criar Vaga
          </button>
        </div>
      </form>
    </div>
  )
}