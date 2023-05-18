import { createApp } from 'vue'
import App from './App'
import installPlugin from '@/common/utils/installPlugin'

const app = createApp(App)

// 安装全局插件
installPlugin(app)
app.mount('#app')
