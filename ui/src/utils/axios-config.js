import axios from "axios"

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
})

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token")
    config.headers.authorization = `${token}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { authorization } = response.headers
    console.log(authorization)
    authorization && localStorage.setItem("token", authorization)

    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { status } = error.response
    if (status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default instance
