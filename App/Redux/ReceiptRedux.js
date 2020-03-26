import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getReceipt: ['params'],
  getReceiptSuccess: ['receiptInfo'],
  payReceipt: ['params'],
  loadHistory: ['params'],
  getListSuccess: ['receiptList'],
})

export const ReceiptTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  receiptInfo: {},
  receiptList:[],
  isLoad: false
})

/* ------------- Selectors ------------- */

export const ReceiptSelectors = {
  getData: state => state.receipt
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ receiptInfo: {}, isLoad: true })
export const loadHistory = (state, action) =>
  state.merge({ receiptList: [], isLoad: true })

export const getReceiptSuccess = (state, {receiptInfo}) =>
  state.merge({ receiptInfo, isLoad: false })
export const getListSuccess = (state, { receiptList }) =>
  state.merge({ receiptList, isLoad: false })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_RECEIPT]: request,
  [Types.GET_RECEIPT_SUCCESS]: getReceiptSuccess,
  [Types.PAY_RECEIPT]: request,
  [Types.LOAD_HISTORY]: loadHistory,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
})
