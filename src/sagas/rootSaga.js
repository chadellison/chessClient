import { all, fork } from 'redux-saga/effects'
import {watchFetchActiveGames} from './activeGamesSagas'

export default function* rootSaga() {
  yield all([
    fork(watchFetchActiveGames)
  ])
}
