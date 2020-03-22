// a library to wrap and simplify api calls
import apisauce from 'apisauce'

// our "constructor"
const create = (baseURL = 'http://localhost:5000/api/') => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000
  })
  //
  const sendPhoneRequest = (params) => api.post(`user/phone`, params )
  const verifiedPhone = (params) => api.post(`user/verify`, params )
  const addUserInfo = (params) => api.post(`user/add`, params )
  const getReceipt = (token, params) => api.post(`receipt/get`, params, { headers : {'token': token}} )

  return {
    sendPhoneRequest,
    verifiedPhone,
    addUserInfo,
    getReceipt
  }
}

// let's return back our create method as the default.
export default {
  create
}
