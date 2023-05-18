import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <ConfigProvider locale={zhCN}>
        <router-view />
      </ConfigProvider>
    )
  }
})
