'use client'
import { SearchPage } from '@/components/templates/SearchPage'
import { FormProviderSearchGarage } from '@/components/forms/searchGarages'
import { Container } from '@/components/atoms/Container'

import { AppHeader } from '@/components/organisms/AppHeader'

import { ListSpotsLayout } from '@/components/templates/ListSpotsLayout'

const MENUITEMS = [
  { label: 'Cadastrar Vagas', href: '/register-spot' },
  { label: 'Buscar', href: '/search' },
]

export default function Page() {
  return (
    <div>
      <AppHeader menuItems={MENUITEMS}/>
      <Container>
        <FormProviderSearchGarage>
          <ListSpotsLayout />
        </FormProviderSearchGarage>
      </Container>
    </div>
  )
}