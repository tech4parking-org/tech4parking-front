
import { Container } from '@/components/atoms/Container'
import { AppHeader } from '@/components/organisms/AppHeader'

import { RegisterSpot } from '@/components/templates/RegisterSpot'

const MENUITEMS = [
    { label: 'Cadastrar Vagas', href: '/register-spot' },
    { label: 'Buscar', href: '/search' },
  ]

export const CreateSpot = () => {
    return (
        <div>
            <AppHeader menuItems={MENUITEMS}/>
            <Container>
                <RegisterSpot />
            </Container>
        </div>
    )
}

export default CreateSpot