export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/index'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: { render: (c) => c('router-view') },
    children: [
      {
        path: '',
        name: 'Projects',
        component: () => import('@/pages/Projects'),
      },
      {
        path: 'comme-au-stade',
        name: 'Comme Au Stade',
        component: () => import('@/pages/Projects/CommeAuStade'),
        meta: {
          title: 'Playground | Comme Au Stade',
        },
      },
    ],
  },
  {
    path: '/games',
    name: 'Games',
    component: { render: (c) => c('router-view') },

    children: [
      {
        path: '',
        name: 'Games',
        component: () => import('@/pages/Games'),
      },
      {
        path: 'simon',
        name: 'Simon',
        component: () => import('@/pages/Games/Simon'),
        meta: {
          title: 'Playground | Simon',
        },
      },
      {
        path: 'snake',
        name: 'Snake',
        component: () => import('@/pages/Games/Snake'),
        meta: {
          title: 'Playground | Snack',
        },
      },
      {
        path: 'connect4',
        name: 'Connect 4',
        component: () => import('@/pages/Games/Puissance4'),
        meta: {
          title: 'Playground | Connect 4',
        },
      },
    ],
  },
  {
    path: '/experiments',
    name: 'Experiments',
    component: { render: (c) => c('router-view') },
    children: [
      {
        path: '',
        name: 'Experiments',
        component: () => import('@/pages/Experiments'),
      },
      {
        path: 'switch',
        name: 'Switch',
        component: () => import('@/pages/Experiments/Switch'),
        meta: {
          title: 'Playground | Switch',
        },
      },
      {
        path: 'palindrome',
        name: 'Palindrome',
        component: () => import('@/pages/Experiments/Palindrome'),
        meta: {
          title: 'Playground | Palindrome',
        },
      },
    ],
  },
]
