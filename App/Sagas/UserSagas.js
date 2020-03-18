
import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import Toast from 'react-native-simple-toast'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { path } from 'ramda'
import StartupActions from '../Redux/StartupRedux'

import { TOKEN } from '../Services/Constant'

export function * sendPhoneRequest (api, action) {
  const { params } = action
  
  yield put(StartupActions.loadProgress(true));
  const response = yield call(api.sendPhoneRequest, params)
  yield put(StartupActions.loadProgress(false));
  // success?
  console.log(response)
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      yield put(NavigationActions.navigate({ routeName: 'VerifyPhoneScreen', params: { code : temp.payload.code, phone: temp.payload.phone }} ));
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}

export function * verifiedPhone (api, action) {
  const { params } = action
  
  const response = yield call(api.verifiedPhone, params)
  // success?
  console.log(response)
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      if(temp.payload) {
        yield AsyncStorage.setItem(TOKEN, JSON.stringify(temp.payload));
        yield put(NavigationActions.navigate({ routeName: 'Drawer' }));
      } else {
        yield put(NavigationActions.navigate({ routeName: 'SignupScreen', params: { phone: params.phone }} ));
      }      
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}

export function * addUserInfo (api, action) {
  const { params } = action
  
  const response = yield call(api.addUserInfo, params)
  // success?
  console.log(response)
  if (response.ok) {
    const temp = path(['data'], response);
    if (temp.code === 200) {
      yield AsyncStorage.setItem(TOKEN, JSON.stringify(temp.payload));
      yield put(NavigationActions.navigate({ routeName: 'Drawer' }));
    } else {
      Toast.show(temp.message);
    }
  } else {
    Toast.show('Request failed.');
  }
}
