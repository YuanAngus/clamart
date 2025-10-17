// axios基础的封装
import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 基地址与超时时间
const httpInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

// 请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// 响应拦截器
httpInstance.interceptors.response.use(res => {
  return res.data
}, e => {
  const userStore = useUserStore()

  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  console.log(e);

  // Token失效处理
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }

  return Promise.reject(e)
})

export default httpInstance