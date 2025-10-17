import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, getCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()

  // 计算
  const allCount = computed(() => cartList.value.reduce((sum, next) => sum + next.count, 0))
  const allPrice = computed(() => cartList.value.reduce((sum, next) => sum + next.count * next.price, 0))
  const isAll = computed(() => cartList.value.every(item => item.selected))
  const isNoCheck = computed(() => cartList.value.every(item => !item.selected))
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((sum, next) => sum + next.count, 0))
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((sum, next) => sum + next.count * next.price, 0))

  function updateCart() {
    getCartListAPI().then(res => cartList.value = res.result)
  }

  function addCart(goods) {
    // 是否登录
    // 后端接口操作购物车
    if (userStore.isLogin) {
      insertCartAPI(goods).then(() => updateCart())
    }
    // 操作本地购物车
    else {
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      if (item)
        item.count += goods.count
      else
        cartList.value.push(goods)
    }
  }

  // 删除购物车
  function delCart(skuId) {
    const skuIds = Array.isArray(skuId) ? skuId : [skuId]
    if (userStore.isLogin) {
      delCartAPI(skuIds).then(() => updateCart())
    }
    else {
      cartList.value = cartList.value.filter(item => !skuIds.includes(item.skuId))
    }
  }

  // 清空
  function clearCart() {
    cartList.value = []
  }

  // 全选
  function allCheck(selected) {
    cartList.value.forEach(item => item.selected = selected)
  }

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    isNoCheck,
    selectedCount,
    selectedPrice,
    updateCart,
    addCart,
    delCart,
    clearCart,
    allCheck
  }
}, {
  persist: true,
})