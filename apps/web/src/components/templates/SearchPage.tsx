'use client'
import { useCallback } from 'react'
import { MapT } from '../organisms/map/Map'
import { Panel } from '../organisms/map/Panel'
import { DefaultZoomControls } from '../organisms/map/ZoomControls'
import { ViewStateChangeEvent } from 'react-map-gl'
import { initialViewState } from '@/utils/constants'
import { SearchPlaceBox } from '../organisms/map/SearchPlacesBox'
import { useFormContext } from 'react-hook-form'
import { FormTypeSearchGarage } from '@/components/forms/searchGarages'
import { IconType } from '../molecules/IconTypes'
import { IconArrowDown } from '@tabler/icons-react'
import { HtmlInput } from '../atoms/HtmlInput'
import { toLocalISOString } from '@/utils/date'
import { ShowGarages } from '../organisms/search/ShowGarages'
import { FilterSidebar } from '../organisms/search/FilterSidebar'
import { Container } from '../atoms/Container'

export const SearchPage = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<FormTypeSearchGarage>()
  console.log('errors ', errors)
  const formData = watch()

  const handleMapChange = useCallback(
    (target: ViewStateChangeEvent['target']) => {
      const bounds = target.getBounds()
      const locationFilter = {
        ne_lat: bounds?.getNorthEast().lat || 0,
        ne_lng: bounds?.getNorthEast().lng || 0,
        sw_lat: bounds?.getSouthWest().lat || 0,
        sw_lng: bounds?.getSouthWest().lng || 0,
      }
      console.log(locationFilter)
      setValue('locationFilter', locationFilter)
    },
    [setValue],
  )

  return (
    <div className="absolute inset-0 bg-black">
      <MapT
        onLoad={(e) => handleMapChange(e.target)}
        onDragEnd={(e) => handleMapChange(e.target)}
        onZoomEnd={(e) => handleMapChange(e.target)}
        initialViewState={initialViewState}
        style={{ height: '100vh', width: '100%' }}  // Assegura que o mapa ocupe toda a altura e largura
      >
        <Panel position="left-top">
          <div className="flex flex-col items-stretch">
            <SearchPlaceBox />
            <div className="flex relative pl-1 flex-col mt-1 bg-white/40 items-center gap-1 backdrop-blur-sm">
              <div className="absolute left-[1px] top-1/2 -translate-y-1/2">
                <IconArrowDown className="p-1" />
              </div>
              <div className="flex gap-1 items-center">
                <IconType time={formData.startTime} />
                <HtmlInput
                  type="datetime-local"
                  className="w-full p-2 text-lg font-light border-0"
                  min={toLocalISOString(new Date()).slice(0, 16)}
                  {...register('startTime', {
                    onChange(event) {
                      trigger('startTime')
                      trigger('endTime')
                    },
                  })}
                />
              </div>
              <div className="flex gap-1 items-center">
                <IconType time={formData.endTime} />
                <HtmlInput
                  min={toLocalISOString(new Date()).slice(0, 16)}
                  type="datetime-local"
                  className="w-full p-2 text-lg font-light border-0"
                  {...register('endTime', {
                    onChange(event) {
                      trigger('endTime')
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </Panel>
        <Panel position="right-center">
          <DefaultZoomControls />
        </Panel>
        {errors && (
          <Panel position="center-bottom">
            {Object.entries(errors).map(([key, value]) => (
              <div className="text-red-800 p-2 shadow bg-white" key={key}>
                {key}: {value.message}
              </div>
            ))}
          </Panel>
        )}
        <Panel position="right-top">
          <FilterSidebar />
        </Panel>
      </MapT>
    </div>
  )
}
