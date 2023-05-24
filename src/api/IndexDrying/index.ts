import api from '@/common/request/index'

const indexDryingUrl = 'SevenList/StatTarget'

/**
 * 获取指标列表
 * @param data
 * @returns
 */
export const getIndexDryingList = (data: any) => {
  return api.get(`${indexDryingUrl}/GetList`, data)
}

/**
 * 获取指标详情
 * @param id
 * @returns
 */
export const getIndexDryingDetail = (id: any) => {
  return api.get(`${indexDryingUrl}/GetForm`, { id })
}

/**
 * 获取待办/已办列表
 * @param data
 * @returns
 */
export const getIndexDryingWorkList = (data: any) => {
  return api.get(`${indexDryingUrl}/GetWorkList`, data)
}

/**
 * 已阅
 * @param id
 * @returns
 */
export const indexDryingIsRead = (id: any) => {
  return api.get(`${indexDryingUrl}/IsRead`, { id })
}

/**
 * 退回
 * @param data
 * @returns
 */
export const indexDryingIsReturn = (data: any) => {
  return api.get(`${indexDryingUrl}/IsReturn`, data)
}

/**
 * 提交指标(暂存/办理)
 * @param data
 * @returns
 */
export const indexDryingSubmit = (data: any) => {
  return api.post(`${indexDryingUrl}/IsReturn`, data)
}
