'use client'
import { SearchPage } from '@/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@/components/forms/searchGarages'
import { Container } from '@/components/atoms/Container'

import { AppHeader } from '@/components/organisms/AppHeader'

const MENUITEMS = [
  { label: 'Cadastrar Vagas', href: '/register-spot' },
  { label: 'Vagas', href: '/list-spots' },
]

export default function Page() {
  return (
    <div>
      <AppHeader menuItems={MENUITEMS}/>
      <Container>
        <FormProviderSearchGarage>
          <SearchPage />
        </FormProviderSearchGarage>
      </Container>
    </div>
  )
}