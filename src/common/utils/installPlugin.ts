import Antd from 'ant-design-vue'
import NProgress from 'nprogress'
import router from '@/router'
import pinia from '@/stores'
import type { App } from 'vue'

import 'ant-design-vue/dist/antd.variable.less'
import '@/assets/css/global.css'
import '@/assets/css/tailwind.css'

// Vue插件安装
export default (app: App<Element>) => {
  NProgress.configure({ easing: 'ease', speed: 500 })

  app.use(Antd)
  app.use(router)
  app.use(pinia)
}
