// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Connections',
      path: '/connections',
      icon: 'mdi:access-point'
    },
    {
      title: 'Catalog',
      path: '/catalog',
      icon: 'mdi:abacus'
    },
    {
      title: 'Browser',
      path: '/browser',
      icon: 'mdi:account-details'
    },
    {
      title: 'Consumers',
      path: '/consumers',
      icon: 'mdi:account-group'
    }
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline'
    // }
  ]
}

export default navigation
