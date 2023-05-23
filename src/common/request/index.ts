import Axios from '@/common/libs/Axios'
import { errorHandler } from './errorHandler'
// import.meta.env.VITE_APP_SERVER_URL
const api = new Axios({ baseURL: '' })

api.instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

api.instance.interceptors.response.use(
  (res) => {
    if (res.data.state === 'success') {
      return res.data.data
    }

    return Promise.reject(res?.data?.msg || '未知错误，请稍后再试')
  },
  (err) => errorHandler(err)
)

export default api
