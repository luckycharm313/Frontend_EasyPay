import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ReceiptTypes } from '../Redux/ReceiptRedux'


/* ------------- Sagas ------------- */

import { startup, isLogin } from './StartupSagas'
import { sendPhoneRequest, verifiedPhone, addUserInfo, getUserInfo, setRate, addOneUser, getOneUserInfo, updateCardInfo } from './UserSagas'
import { getReceipt, payReceipt, loadHistory, payOneReceipt } from './ReceiptSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.IS_LOGIN, isLogin),

    takeLatest(UserTypes.SEND_PHONE_REQUEST, sendPhoneRequest, api),
    takeLatest(UserTypes.VERIFIED_PHONE, verifiedPhone, api),
    takeLatest(UserTypes.ADD_USER_INFO, addUserInfo, api),
    takeLatest(UserTypes.GET_USER_INFO, getUserInfo, api),
    takeLatest(UserTypes.SET_RATE, setRate, api),
    takeLatest(UserTypes.ADD_ONE_USER, addOneUser, api),
    takeLatest(UserTypes.GET_ONE_USER_INFO, getOneUserInfo, api),
    takeLatest(UserTypes.UPDATE_CARD_INFO, updateCardInfo, api),

    takeLatest(ReceiptTypes.GET_RECEIPT, getReceipt, api),
    takeLatest(ReceiptTypes.PAY_RECEIPT, payReceipt, api),
    takeLatest(ReceiptTypes.LOAD_HISTORY, loadHistory, api),

    takeLatest(ReceiptTypes.PAY_ONE_RECEIPT, payOneReceipt, api),
  ])
}
