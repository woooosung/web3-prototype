// ** Icon imports
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Competition'
    },
    {
      title: 'Competitions',
      icon: CreditCardOutline,
      path: '/competitions'
    },
    {
      title: 'Ranking',
      icon: Table,
      path: '/ranking'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
