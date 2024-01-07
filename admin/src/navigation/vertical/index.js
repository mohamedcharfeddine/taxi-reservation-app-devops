import React, { useContext } from 'react';
import { UserContext } from 'src/@core/context/userContext';

// ** Icon imports
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const Navigation = () => {

  const { user } = useContext(UserContext);
  const isAdmin = user && user.role === 'admin'


  const navigationItems=  [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },


    {
      sectionTitle: 'Admin Interface'
    },

    {
      title: 'Taxi Services',
      icon: CreditCardOutline,
      path: '/offres',
      hidden: !isAdmin
    },
    {
      title: 'Booking Dashboard',
      icon: Table,
      path: '/reservations'
    },
    {
      icon: LibraryAddIcon,
      title: 'Create New Service',
      path: '/add-offre',
      hidden: !isAdmin

    },
    {
      icon: GroupIcon,
      title: 'User management',
      path: '/userManagement',
      hidden: !isAdmin

    },
    {
      icon: MessageIcon,
      title: 'Contact For Business',
      path: '/messages',
      hidden: !isAdmin

    }

  ];

  const filteredNavigation = navigationItems.filter(item => !item.hidden);

  return filteredNavigation;

}

export default Navigation
