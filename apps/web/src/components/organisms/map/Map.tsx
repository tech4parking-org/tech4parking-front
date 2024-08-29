import MapGL, { useMap } from 'react-map-gl'
import * as Map from 'react-map-gl'

type MapProps = React.ComponentProps<typeof MapGL>

export const MapT = ({ ...props }: MapProps) => {
  return (
    <MapGL
      {...props}
      projection={{ name: 'globe' }}
      initialViewState={{
        latitude: -23.541651,
        longitude: -46.627771,
        zoom: 15.5
      }}
      mapStyle="mapbox://styles/tech4parking/cm031gtjv009901qvbeewg6k6"
      attributionControl={false}  // Desativa o controle de copyright
      mapboxAccessToken="MAPBOX_TOKEN_REMOVED"
      style={{ }}
      scrollZoom={false}
    >
      <StyleMap />
      {props.children}
    </MapGL>
  )
}


export const StyleMap = () => {
  const { current } = useMap()

  current?.on('style.load', () => {
    current?.getMap().setFog({
      color: 'rgb(255, 255, 255)', // Lower atmosphere
      range: [1, 10],
      //   @ts-ignore
      'high-color': 'rgb(200, 200, 200)', // Upper atmosphere
      'horizon-blend': 0.05, // Atmosphere thickness (default 0.2 at low zooms)
      'space-color': 'rgb(150, 150, 150)', // Background color
      'star-intensity': 0.5, // Background star brightness (default 0.35 at low zoooms )
    })
  })
  return null
}
