import { createRouter, createWebHistory } from 'vue-router'
import { useUserStoreWithOut } from '@/stores/modules/user'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
    const userStore = useUserStoreWithOut()
    userStore.getUserInfo()
    return true;
  })

export default router
