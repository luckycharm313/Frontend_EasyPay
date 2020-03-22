import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getReceipt: ['params'],
  getReceiptSuccess: ['receiptInfo']
})

export const ReceiptTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  receiptInfo: {},
  isLoad: false
})

/* ------------- Selectors ------------- */

export const ReceiptSelectors = {
  getData: state => state.receipt
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ receiptInfo: {}, isLoad: false })
export const getReceiptSuccess = (state, {receiptInfo}) =>
  state.merge({ receiptInfo, isLoad: true })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RECEIPT]: request,
  [Types.GET_RECEIPT_SUCCESS]: getReceiptSuccess,
})
