import { all, fork } from 'redux-saga/effects'
import {watchFetchActiveGames} from './activeGamesSagas'
import {watchLogin} from './userSagas'

export default function* rootSaga() {
  yield all([
    fork(watchFetchActiveGames),
    fork(watchLogin)
  ])
}
