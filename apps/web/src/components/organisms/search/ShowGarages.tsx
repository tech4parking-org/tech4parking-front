import { useLazyQuery } from '@apollo/client'
import { SearchGaragesDocument } from '@/components/network/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'
import { useConvertSearchFormToVariables } from '@/components/forms/adapters/searchFormAdapter'
import { Panel } from '../map/Panel'
import { Loader } from '../../molecules/Loader'
import { IconInfoCircle } from '@tabler/icons-react'

export const ShowGarages = () => {
  const { variables, debouncing } = useConvertSearchFormToVariables()

  const [
    searchGarages,
    { loading: garagesLoading, data, previousData, error },
  ] = useLazyQuery(SearchGaragesDocument, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => {
      console.error("Apollo Error:", err)
    }
  })

  useEffect(() => {
    if (variables) {
      console.log("Search Variables:", variables)
      searchGarages({ variables })
    }
  }, [variables, searchGarages])

  const garages = data?.searchGarages || previousData?.searchGarages || []
  const loading = debouncing || garagesLoading

  if (error) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>{error.message}</div>
        </div>
      </Panel>
    )
  }

  if (!loading && garages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {garages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}
