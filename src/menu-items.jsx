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
      title: 'Email',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'component2',
          title: 'Email',
          type: 'collapse',
          icon: 'feather icon-mail',
          children: [
            {
              id: 'forms',
              title: 'Add Email',
              type: 'item',
              icon: 'feather icon-plus-circle',
              url: '/email/addemail'
            }
          ]
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
          url: '/dashboard'
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
    {
      id: 'ui-forms3',
      title: 'User',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'component6',
          title: 'Profile',
          type: 'item',
          icon: 'feather icon-user',
          url: '/profile'
        }
      ]
    },
     {
      id: 'ui-forms4',
      title: 'Security',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'component7',
          title: 'Security',
          type: 'item',
          icon: 'feather icon-shield',
          url: '/dashboard'
        }
      ]
    }
  ]
}

export default menuItems;
