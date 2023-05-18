import { defineComponent, KeepAlive } from 'vue'

export default defineComponent({
  name: 'LayoutMain',
  setup() {
    const slots = {
      default: ({ Component, route }: any) => {
        return route.noKeepAlive ? { Component } : <KeepAlive>{Component}</KeepAlive>
      }
    }
    return () => (
         <router-view v-slots={slots}></router-view>
        )
    }
})

