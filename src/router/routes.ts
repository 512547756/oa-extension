import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    redirect: '/IndexDrying',
    component: () => import('@/layout/index'),
    children: [
      {
        path: 'IndexDrying',
        name: 'IndexDrying',
        component: () => import(`@/views/IndexDrying/index.vue`)
      },
    ]
  }
]

export { routes }
