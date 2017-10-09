import axios, { AxiosRequestConfig } from "axios";
import { getConfigurationValue } from 'config'
import { appLogs } from 'config/logger'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  responseTime?: number,
  startTime?: number
}
axios.defaults.headers.common['User-Agent'] = getConfigurationValue('app')
// Add a request interceptor
axios.interceptors.request.use(
  (req: any) => {
    appLogs.info({ req })
    req.startTime = Date.now()
    return req
  },
  (error) => {
    appLogs.error({ reqError: error })
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    const { data, status, statusText, headers } = response
    const config: CustomAxiosRequestConfig = response.config
    config.responseTime = Date.now() - config.startTime
    delete config.startTime
    const res = { data, status, statusText, headers, config }
    appLogs.info({ res })
    return res
  },
  (error) => {
    const { response, config } = error
    if (response) {
      const { data, status, statusText, headers } = response
      config.responseTime = Date.now() - config.startTime
      delete config.startTime
      const errorResponse = { data, status, statusText, headers, config }
      appLogs.error({ errorResponse })
      error.status = error.response.status
    } else {
      appLogs.error({ errorResponse: error })
    }
    return Promise.reject(error)
  },
)
