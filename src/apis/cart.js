import httpInstance from '@/utils/http'

export function insertCartAPI(goods) {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: goods
  })
}

export function getCartListAPI() {
  return httpInstance({
    url: '/member/cart'
  })
}

export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

export function mergeCartAPI(data) {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}