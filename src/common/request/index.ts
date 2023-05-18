import Axios from '@/common/libs/Axios'
import { errorHandler } from './errorHandler'

const api = new Axios({ baseURL: process.env.VITE_APP_SERVER_URL })

api.instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

api.instance.interceptors.response.use(
  (res) => {
    if (res.data.success) {
      return res.data
    }

    return Promise.reject(res?.data?.msg || '未知错误，请稍后再试')
  },
  (err) => errorHandler(err)
)

export default api
