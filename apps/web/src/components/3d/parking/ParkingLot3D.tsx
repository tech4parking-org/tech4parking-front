'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, RoundedBox } from '@react-three/drei'
import { Group, MathUtils } from 'three'

interface Spot {
  spot_id: string
  name: string
  availability: string
}

const FREE = '#22c55e'
const BUSY = '#ef4444'
const CAR_COLORS = ['#f8fafc', '#facc15', '#3b82f6', '#1f2937', '#dc2626', '#94a3b8']
const SPOT_W = 3
const SPOT_D = 5.2
const PER_ROW = 6
const REFRESH_MS = 3000

const isBusy = (s: Spot) => s.availability === 'ocupada'

function slotPosition(index: number): { x: number; z: number; dir: 1 | -1 } {
  const row = index < PER_ROW ? 0 : 1
  const col = index % PER_ROW
  const x = (col - (PER_ROW - 1) / 2) * SPOT_W
  return row === 0 ? { x, z: -SPOT_D / 2 - 2.2, dir: -1 } : { x, z: SPOT_D / 2 + 2.2, dir: 1 }
}

function Car({ color, parked, z, dir }: { color: string; parked: boolean; z: number; dir: 1 | -1 }) {
  const ref = useRef<Group>(null)
  const progress = useRef(parked ? 1 : 0)

  useFrame((_, delta) => {
    const target = parked ? 1 : 0
    progress.current = MathUtils.damp(progress.current, target, 3, delta)
    const p = progress.current
    if (!ref.current) return
    ref.current.visible = p > 0.02
    ref.current.position.z = MathUtils.lerp(0, z, p)
    ref.current.scale.setScalar(Math.min(1, p * 2.5))
  })

  return (
    <group ref={ref} rotation={[0, dir === 1 ? 0 : Math.PI, 0]}>
      <RoundedBox args={[1.8, 0.55, 3.9]} radius={0.18} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} metalness={0.35} roughness={0.35} />
      </RoundedBox>
      <RoundedBox args={[1.55, 0.5, 2.1]} radius={0.16} position={[0, 1.0, -0.25]}>
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.15} />
      </RoundedBox>
      {[
        [-0.9, 0.33, 1.25],
        [0.9, 0.33, 1.25],
        [-0.9, 0.33, -1.25],
        [0.9, 0.33, -1.25],
      ].map((w, i) => (
        <mesh key={i} position={w as [number, number, number]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.34, 0.34, 0.28, 20]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, 0.55, -1.96]}>
          <boxGeometry args={[0.4, 0.14, 0.04]} />
          <meshStandardMaterial color="#fef9c3" emissive="#fde047" emissiveIntensity={1.5} />
        </mesh>
      ))}
    </group>
  )
}

function Sensor({ busy, z, dir }: { busy: boolean; z: number; dir: 1 | -1 }) {
  const light = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (light.current) light.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 4) * 0.15)
  })
  const back = z + (dir * SPOT_D) / 2
  return (
    <group position={[SPOT_W / 2 - 0.35, 0, back]}>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 12]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>
      <group ref={light} position={[0, 1.28, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color={busy ? BUSY : FREE} emissive={busy ? BUSY : FREE} emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  )
}

function ParkingSlot({ spot, index }: { spot: Spot; index: number }) {
  const { x, z, dir } = slotPosition(index)
  const busy = isBusy(spot)
  const color = useMemo(() => CAR_COLORS[index % CAR_COLORS.length], [index])
  const back = z + (dir * SPOT_D) / 2

  return (
    <group position={[x, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
        <planeGeometry args={[SPOT_W - 0.3, SPOT_D - 0.3]} />
        <meshStandardMaterial color={busy ? BUSY : FREE} transparent opacity={0.22} emissive={busy ? BUSY : FREE} emissiveIntensity={0.35} />
      </mesh>
      {[-SPOT_W / 2, SPOT_W / 2].map((lx) => (
        <mesh key={lx} position={[lx, 0.03, z]}>
          <boxGeometry args={[0.1, 0.02, SPOT_D]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      ))}
      <mesh position={[0, 0.03, back]}>
        <boxGeometry args={[SPOT_W, 0.02, 0.1]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <Sensor busy={busy} z={z} dir={dir} />
      <Car color={color} parked={busy} z={z} dir={dir} />
      <Html position={[0, 0.05, back + dir * 0.9]} center distanceFactor={14}>
        <div
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold text-white shadow ${busy ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {spot.spot_id}
        </div>
      </Html>
    </group>
  )
}

function Lot({ spots }: { spots: Spot[] }) {
  const width = PER_ROW * SPOT_W + 6
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[12, 18, 8]} intensity={1.4} />
      <directionalLight position={[-10, 8, -6]} intensity={0.4} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, 26]} />
        <meshStandardMaterial color="#26282e" roughness={0.9} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh key={i} position={[-width / 2 + 2 + i * ((width - 4) / 8), 0.02, 0]}>
          <boxGeometry args={[1.2, 0.02, 0.12]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
      ))}
      {spots.slice(0, PER_ROW * 2).map((s, i) => (
        <ParkingSlot key={s.spot_id} spot={s} index={i} />
      ))}
    </>
  )
}

export function ParkingLot3D() {
  const [spots, setSpots] = useState<Spot[]>([])
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await axios.get<Spot[]>(`${process.env.NEXT_PUBLIC_SPOTS_API_URL}/spots`)
        if (!alive) return
        setSpots([...res.data].sort((a, b) => a.spot_id.localeCompare(b.spot_id)))
        setUpdatedAt(new Date())
        setError(false)
      } catch {
        if (alive) setError(true)
      }
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  const busy = spots.filter(isBusy).length
  const free = spots.length - busy

  return (
    <div className="relative h-[calc(100vh-64px)] w-full" style={{ background: 'linear-gradient(180deg, #0d0f13 0%, #1c1f26 100%)' }}>
      <Canvas camera={{ position: [14, 13, 16], fov: 45 }}>
        <Lot spots={spots} />
        <OrbitControls autoRotate autoRotateSpeed={0.6} enablePan={false} maxPolarAngle={Math.PI / 2.3} minDistance={12} maxDistance={40} />
      </Canvas>

      <div className="absolute left-6 top-6 w-72 rounded-2xl p-5 text-white shadow-xl backdrop-blur" style={{ background: 'rgba(13, 15, 19, 0.82)', border: '1px solid rgba(251, 165, 7, 0.35)' }}>
        <div className="mb-3 flex items-center gap-2">
          <img src="/logo-mark.png" alt="T4Parking" className="h-8 w-8" />
          <span className="text-sm font-bold tracking-wide text-primary">T4Parking</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${error ? 'bg-red-400' : 'bg-green-400'}`} />
            <span className={`relative inline-flex h-3 w-3 rounded-full ${error ? 'bg-red-500' : 'bg-green-500'}`} />
          </span>
          <h1 className="text-lg font-bold">Estacionamento ao vivo</h1>
        </div>
        <p className="mt-1 text-xs text-gray-100">
          {error ? 'Sem conexão com a API de vagas' : 'Sensores IoT atualizando em tempo real'}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl p-3" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
            <p className="text-3xl font-bold text-green-400">{free}</p>
            <p className="text-xs text-gray-100">disponíveis</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(239, 68, 68, 0.15)' }}>
            <p className="text-3xl font-bold text-red-400">{busy}</p>
            <p className="text-xs text-gray-100">ocupadas</p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-600">
          <div
            className="h-full bg-red-500 transition-all duration-700"
            style={{ width: spots.length ? `${(busy / spots.length) * 100}%` : '0%' }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-200">
          {spots.length ? `${Math.round((busy / spots.length) * 100)}% de ocupação` : 'carregando vagas...'}
        </p>

        {updatedAt && (
          <p className="mt-3 text-[11px] text-gray-300">
            atualizado às {updatedAt.toLocaleTimeString('pt-BR')}
          </p>
        )}
      </div>
    </div>
  )
}
