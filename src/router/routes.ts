import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/Home',
    component: () => import('@/layout/index'),
    children: [
      {
        path: 'IndexDrying',
        name: 'IndexDrying',
        component: () => import(`@/views/IndexDrying/index.vue`)
      },
      {
        path: '/Home',
        name: 'Home',
        props: true,
        component: () => import(`@/views/IndexDrying/Home.vue`)
      },
      {
        path: '/From',
        name: 'From',
        component: () => import(`@/views/From/index.vue`)
      },
      {
        path: '/DryingDetail',
        name: 'DryingDetail',
        props: true,
        component: () => import(`@/views/IndexDrying/index.vue`)
      }
    ]
  }
]

export { routes }
