import httpInstance from '@/utils/http'

export const getUserOrder = (params) => {
  return httpInstance({
    url: '/member/order',
    method: 'GET',
    params
  })
}

export const deleteUserOrder = (id) => {
  return httpInstance({
    url: '/member/order',
    method: 'DELETE',
    data: { id }
  })
}