import { call, put } from 'redux-saga/effects'
import ReceiptActions from '../Redux/ReceiptRedux'
import Toast from 'react-native-simple-toast'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { path } from 'ramda'
import { TOKEN } from '../Services/Constant'
import StartupActions from '../Redux/StartupRedux'

export function * getReceipt (api, action) {
  const { params } = action
  const token = JSON.parse(yield AsyncStorage.getItem(TOKEN))
  const response = yield call(api.getReceipt, token, params);
  console.log({response})
  // success?
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      yield put(ReceiptActions.getReceiptSuccess(temp.payload));
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}

export function * payReceipt (api, action) {
  const { params } = action
  const token = JSON.parse(yield AsyncStorage.getItem(TOKEN))
  yield put(StartupActions.loadProgress(true));
  const response = yield call(api.payReceipt, token, params);
  yield put(StartupActions.loadProgress(false));
  console.log({response})
  // success?
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      yield put(NavigationActions.navigate({ routeName: 'ResultScreen', params: { tipResult: temp.payload, isError: false }} ));
    } else if( temp.code === 400 ) {
      yield put(NavigationActions.navigate({ routeName: 'ResultScreen', params: { isError: true }} ));      
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}

export function * loadHistory (api, action) {
  const { params } = action
  const token = JSON.parse(yield AsyncStorage.getItem(TOKEN))
  
  const response = yield call(api.loadHistory, token, params);
  console.log({response})
  // success?
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      yield put(ReceiptActions.getListSuccess(temp.payload));
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}
