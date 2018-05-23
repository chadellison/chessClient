import { put, takeEvery, call } from 'redux-saga/effects'
import {successfulLoginAction, failedLoginAction} from '../actions/userActions'
import {loginModalAction, spinnerAction} from '../actions/modalActions'
import {login} from './apiHelper'

export function* watchLogin() {
  yield takeEvery('LOGIN', postForLogin)
}

export function* postForLogin(credentials) {
  try {
    const userResponse = yield call(login, credentials)
    yield put(successfulLoginAction(userResponse.data.attributes))
    yield put(loginModalAction(false))
  }
  catch(err) {
    yield put(failedLoginAction())
    console.log(err)
  }
  yield put(spinnerAction(false))
}
