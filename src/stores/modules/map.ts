import { defineStore } from 'pinia';
import keyBy from 'lodash/keyBy';
import pinia from '@/stores'


interface MapState {
    // 看板是否展开
    unfold: boolean;
    // 主题
    theme: string;
    // 砂类型
    sandType: string;
    // 砂头部数据
    sandTopData: any[];
  }
export const useMapStore = defineStore({
    id: 'map',
    state: (): MapState => ({
        unfold: true,
        theme: 'normal',
        sandType: "sand_company_num",
        sandTopData: []
    }),
    getters: {
        sandTop (): any {
            return keyBy(this.sandTopData, 'itemValue')
        }
    },
    actions: {
        setSandType(type: string): void {
            this.sandType = type
        },
        getSandMapData() {
            
        }
    }
})

// 需要在setup之外使用
export function useMapStoreWithOut() {
    return useMapStore(pinia);
}