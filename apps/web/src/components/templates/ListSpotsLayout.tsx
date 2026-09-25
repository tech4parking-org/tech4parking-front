import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Spot {
  spot_id: string
  name: string
  latitude: number
  longitude: number
  availability: string
}

export const ListSpotsLayout: React.FC = () => {
  const [existingSpots, setExistingSpots] = useState<Spot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExistingSpots = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SPOTS_API_URL}/spots`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.data && Array.isArray(response.data)) {
          setExistingSpots(response.data)
        } else {
          setExistingSpots([])
        }
      } catch (error) {
        console.error('Erro ao carregar vagas existentes:', error)
        setError('Ocorreu um erro ao carregar as vagas. Por favor, tente novamente mais tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExistingSpots()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <p className="text-gray-600">Carregando vagas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Vagas Existentes</h2>
      <div className="bg-white shadow-md rounded px-8 py-6">
        {existingSpots.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {existingSpots.map((spot) => (
              <li key={spot.spot_id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{spot.name}</h3>
                    <p className="text-sm text-gray-500">ID: {spot.spot_id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Latitude: {spot.latitude}</p>
                    <p className="text-sm text-gray-500">Longitude: {spot.longitude}</p>
                    <p className={`text-sm font-medium ${spot.availability === 'disponível' ? 'text-green-600' : 'text-red-600'}`}>
                      {spot.availability}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">Não existem vagas cadastradas no momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}