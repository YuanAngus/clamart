import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  const cartStore = useCartStore()
  const isLogin = computed(() => userInfo.value.token)

  // 2. 定义获取接口数据的action函数
  function getUserInfo({ account, password }) {
    loginAPI({ account, password }).then(res => {
      userInfo.value = res.result
      ElMessage({
        type: 'success',
        message: '登陆成功'
      })
      mergeCartAPI(cartStore.cartList).then(() => cartStore.updateCart())
      router.replace('/')
    }).catch(e => {
      console.log(e)
    })
  }

  function clearUserInfo() {
    userInfo.value = {}
  }

  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    isLogin,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})