import { put, takeEvery, call } from 'redux-saga/effects'
import {updateUserAction, failedLoginAction, failedSignUpAction} from '../actions/userActions'
import {loginModalAction, spinnerAction, signUpModalAction} from '../actions/modalActions'
import {postData} from './apiHelper'

export function* watchLogin() {
  yield takeEvery('LOGIN', login)
}

export function* watchSignUp() {
  yield takeEvery('SIGN_UP', signUp)
}

export function* login(action) {
  let body = JSON.stringify({ credentials: action.credentials })
  try {
    const response = yield call(postData, '/api/v1/authentication', body)
    yield put(updateUserAction(response.data.attributes))
    yield put(loginModalAction(false))
  }
  catch(err) {
    yield put(failedLoginAction())
    console.log(err)
  }
  yield put(spinnerAction(false))
}


export function* signUp(action) {
  let body = JSON.stringify({ user: action.signUpInfo })
  try {
    const response = yield call(postData, '/api/v1/users', body)
    yield put(updateUserAction(response.data.attributes))
    yield put(signUpModalAction(false))
  }
  catch(err) {
    yield put(failedSignUpAction())
    console.log(err)
  }
  yield put(spinnerAction(false))
}
