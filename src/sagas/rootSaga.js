import { all, fork } from 'redux-saga/effects'
import {watchFetchActiveGames} from './activeGamesSagas'
import {watchLogin, watchSignUp} from './userSagas'

export default function* rootSaga() {
  yield all([
    fork(watchFetchActiveGames),
    fork(watchLogin),
    fork(watchSignUp)
  ])
}
