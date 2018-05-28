import { all, fork } from 'redux-saga/effects'
import {watchFetchActiveGames, watchCreateGame, watchJoinGame} from './gamesSagas'
import {watchLogin, watchSignUp} from './userSagas'

export default function* rootSaga() {
  yield all([
    fork(watchFetchActiveGames),
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchCreateGame),
    fork(watchJoinGame)
  ])
}
