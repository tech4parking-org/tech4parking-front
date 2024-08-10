'use client'
import { SearchPage } from '@vagasaservice/ui/src/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@vagasaservice/forms/src/searchGarages'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}