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
  const getUserInfo = (token) => api.get(`user/get`, null, { headers : {'token': token}} )
  const setRate = (token, params) => api.post(`user/setRate`, params, { headers : {'token': token}} )
  const getReceipt = (params) => api.post(`receipt/get`, params)
  const payReceipt = (token, params) => api.post(`receipt/pay`, params, { headers : {'token': token}} )
  const loadHistory = (token, params) => api.post(`receipt/load`, params, { headers : {'token': token}} )
  
  // one time payment
  const addOneUser = (params) => api.post(`user/addOneUser`, params )
  const payOneReceipt = (params) => api.post(`receipt/payOne`, params )

  return {
    sendPhoneRequest,
    verifiedPhone,
    addUserInfo,
    getUserInfo,
    setRate,
    getReceipt,
    payReceipt,
    loadHistory,
    
    // one time payment
    addOneUser,
    payOneReceipt
  }
}

// let's return back our create method as the default.
export default {
  create
}
