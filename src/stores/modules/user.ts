import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/IndexDrying/index'
import pinia from '@/stores'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
       userInfo: {}
    }),
    getters: {
      
    },
    actions: {
        async getUserInfo(){
            const res: any = await getUserInfo()
            this.userInfo = res
            console.log(this.userInfo)
        },
    }
})

// 需要在setup之外使用
export function useUserStoreWithOut() {
    return useUserStore(pinia);
}