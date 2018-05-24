import { put, takeEvery, call } from 'redux-saga/effects'
import {updateUserAction, failedLoginAction, failedSignUpAction} from '../actions/userActions'
import {loginModalAction, spinnerAction, signUpModalAction} from '../actions/modalActions'
import {login, signUp} from './apiHelper'

export function* watchLogin() {
  yield takeEvery('LOGIN', postForLogin)
}

export function* watchSignUp() {
  yield takeEvery('SIGN_UP', postForSignUp)
}

export function* postForLogin(credentials) {
  try {
    const response = yield call(login, credentials)
    yield put(updateUserAction(response.data.attributes))
    yield put(loginModalAction(false))
  }
  catch(err) {
    yield put(failedLoginAction())
    console.log(err)
  }
  yield put(spinnerAction(false))
}


export function* postForSignUp(signUpInfo) {
  try {
    const response = yield call(signUp, signUpInfo)
    yield put(updateUserAction(response.data.attributes))
    yield put(signUpModalAction(false))
  }
  catch(err) {
    yield put(failedSignUpAction())
    console.log(err)
  }
  yield put(spinnerAction(false))
}
