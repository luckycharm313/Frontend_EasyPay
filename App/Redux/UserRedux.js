import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendPhoneRequest: ['params'],
  verifiedPhone: ['params'],
  addUserInfo: ['params'],
  getUserInfo: null,
  getSuccess: ['info'],
  setRate: ['params'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  info: {},
  isLoad: false
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getData: state => state.info
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ info: {}, isLoad: false })
export const getSuccess = (state, { info }) =>
  state.merge({ info, isLoad: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_PHONE_REQUEST]: request,
  [Types.VERIFIED_PHONE]: request,
  [Types.ADD_USER_INFO]: request,
  [Types.GET_USER_INFO]: request,
  [Types.GET_SUCCESS]: getSuccess,
  [Types.SET_RATE]: request,
})
