import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class HttpRequest {
  public instance: AxiosInstance

  private baseURL: string

  private headers: any

  constructor({ baseURL, headers = {} }: AxiosRequestConfig) {
    this.baseURL = baseURL as string
    this.headers = headers
    this.instance = axios.create()
  }

  get<T = any>(url: string, data: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: 'get',
      params: data,
      ...config
    })
  }

  post<T = any>(url: string, data: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      data,
      ...config
    })
  }

  put<T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.request<T>({
      url,
      method: 'put',
      data,
      ...config
    })
  }

  delete<T = any>(url: string, data: any, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      url,
      method: 'delete',
      data,
      ...config
    })
  }

  public getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      headers: this.headers
    }
    return config
  }

  public request<T = any>(options: AxiosRequestConfig) {
    return this.instance.request<T, any>(Object.assign(this.getInsideConfig(), options))
  }
}

export default HttpRequest
