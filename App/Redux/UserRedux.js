import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  sendPhoneRequest: ['params'],
  verifiedPhone: ['params'],
  addUserInfo: ['params'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  info: {},
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getData: state => state.info
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ info: {} })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_PHONE_REQUEST]: request,
  [Types.VERIFIED_PHONE]: request,
  [Types.ADD_USER_INFO]: request,
})
