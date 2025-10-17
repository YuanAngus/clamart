import httpInstance from "@/utils/http"

export function loginAPI({ account, password }) {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}

export function getLikeListAPI({ limit = 4 }) {
  return httpInstance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}

export function addAddressAPI(data) {
  return httpInstance({
    url: '/member/address',
    method: 'POST',
    data
  })
}
export function defaultAddressAPI(id) {
  return httpInstance({
    url: '/member/address/default',
    method: 'POST',
    data: { id }
  })
}