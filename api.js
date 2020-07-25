import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
})

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken')

    if (token != null) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export default instance