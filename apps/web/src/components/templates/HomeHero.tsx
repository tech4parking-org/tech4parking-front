import Link from 'next/link'
import { IconBolt, IconCreditCard, IconLivePhoto, IconRoute, IconSearch } from '@tabler/icons-react'

const FEATURES = [
  { icon: IconBolt, title: 'Tempo real', text: 'Sensores IoT em cada vaga' },
  { icon: IconCreditCard, title: 'Reserva e pagamento', text: 'Direto pelo app' },
  { icon: IconRoute, title: 'Rota até a vaga', text: 'Mapa com o caminho' },
]

export const HomeHero = () => {
  return (
    <div className="relative z-10 flex h-full items-center">
      <div className="max-w-xl space-y-6 px-2 py-10">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-white"
          style={{ background: 'rgba(251, 165, 7, 0.15)', border: '1px solid rgba(251, 165, 7, 0.5)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          Sensores IoT ao vivo
        </span>

        <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
          Precisa <span className="text-primary">estacionar?</span>
        </h1>

        <p className="text-lg text-gray-100">
          Encontre, reserve e acompanhe vagas de estacionamento em tempo real, com um sensor em cada vaga
          dizendo se ela está livre ou ocupada.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-bold text-black shadow-lg transition hover:bg-primary-400"
          >
            <IconSearch size={20} /> Encontrar vaga
          </Link>
          <Link
            href="/parking"
            className="flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-3 text-base font-bold text-white transition hover:bg-primary hover:text-black"
          >
            <IconLivePhoto size={20} /> Ver estacionamento ao vivo
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            >
              <Icon size={22} className="text-primary" />
              <p className="mt-2 text-sm font-bold text-white">{title}</p>
              <p className="text-xs text-gray-200">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
