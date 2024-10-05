import { color } from "d3";
import { title } from "process";

const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Home',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Saga admin',
          type: 'item',
          icon: 'feather icon-home',
          color: 'primary',
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'ui-element',
      title: 'Domain',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Domain',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Add Domain',
              type: 'item',
              icon: 'feather icon-plus-circle',
              url: '/domains/adddomain'
            },
            {
              id: 'badges',
              title: 'View Domain',
              type: 'item',
              icon: 'feather icon-eye',
              url: '/domains/viewdomain'
            },
          ]
        }
      ]
    },
    {
      id: 'ui-forms1',
      title: 'Users',
      type: 'group',
      icon: 'icon-group',
      children: [
        
        {
           id: 'forms',
           title: 'Add User',
           type: 'item',
           icon: 'feather icon-plus-circle',
           url: '/email/addemail'
        },
        {
          id: 'component3',
          title: 'Users',
          type: 'item',
          icon: 'feather icon-user',
          url: '/email/users'
        },
        {
          id: 'component4',
          title: 'groups',
          type: 'item',
          icon: 'feather icon-users',
          url: '/groups'
        }
      ]
    },
    {
      id: 'ui-forms2',
      title: 'Plans',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'component5',
          title: 'Subcription',
          type: 'item',
          icon: 'feather icon-credit-card',
          url: '/plans'
        }
      ]
    },
  ]
}

export default menuItems;
