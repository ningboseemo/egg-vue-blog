import axios from 'axios'

export default function createHttp(vue) {
  let protocol = location.protocol
  let host = location.host
  let browerUrl = protocol + '//' + host
  let baseURL = browerUrl
  let proxtUrl = localStorage.getItem('host')
  if (proxtUrl) {
    baseURL = proxtUrl
  }

  // export const CancelToken = axios.CancelToken
  // const source = CancelToken.source()

  const instance = axios.create({
    baseURL: baseURL + '/api',
    xsrfHeaderName: 'x-csrf-token'
  })

  instance.interceptors.request.use((config) => {
    let nbToken = localStorage.getItem('nb-token')
    let cookies = {}
    document.cookie.split(';').forEach(item => {
      let cookie = item.split('=')
      cookies[cookie[0].trim()] = cookie[1].trim()
    })
    if (nbToken) {
      config.headers['nb-token'] = nbToken
    }
    if (cookies.csrfToken) {
      config.headers['x-csrf-token'] = cookies.csrfToken
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use((response) => {
    if (response.data.code === 0) {
      vue.$Message.error(response.data.message)
    }
    return response.data
  }, (err) => {
    vue.$Message.error('网路请求失败，请稍后～ _ ～')
    return Promise.reject(err)
  })
  return instance
}
