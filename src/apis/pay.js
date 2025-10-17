import httpInstance from '@/utils/http'

export const getOrderAPI = (id) => {
  return httpInstance({
    url: `/member/order/${id}`
  })
}

export const payOrderAPI = (id) => {
  return httpInstance({
    url: '/member/pay',
    method: 'POST',
    data: { id }
  })
}