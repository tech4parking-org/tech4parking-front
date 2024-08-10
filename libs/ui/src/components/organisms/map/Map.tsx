import MapGL, { useMap } from 'react-map-gl'
import * as Map from 'react-map-gl'

type MapProps = React.ComponentProps<typeof MapGL> & { height?: string }

export const MapT = ({ height = 'calc(100vh - 4rem)', ...props }: MapProps) => {
  const t =
    <MapGL
      {...props}
      projection={{ name: 'globe' }}
      mapStyle="mapbox://styles/iamkarthick/clebahxqe001701mo1i1adtw3"
      mapboxAccessToken="MAPBOX_TOKEN_REMOVED"
      style={{ height }}
      scrollZoom={false}
    >
      <StyleMap />
      {props.children}
    </MapGL>
  
  console.log(t)
  return t
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
