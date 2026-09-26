import { Role } from '@/utils/types'

export interface IBrandProps {
  className?: string
  shortForm?: boolean
  type?: Role
}

export const Brand = ({
  shortForm = false,
  className,
  type = undefined,
}: IBrandProps) => {
  return (
    <div className={`grid place-items-center z-50 ${className}`}>
      <div className="text-xl ">
        {shortForm ? (
          <img src="/logo-mark.png" alt="T4Parking" className="h-8 w-8" />
        ) : (
          <div className="flex items-center gap-2 font-medium tracking-tighter font-playfair">
            <img src="/logo-mark.png" alt="T4Parking" className="h-9 w-9" />
            <div>
              <div className="flex gap-1">
                <div>
                  <h1>T4Parking</h1>
                </div>
                {type ? <span className="text-xs">{type}</span> : null}
              </div>
              <div className="text-xs text-gray">Vagas as a Service</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}