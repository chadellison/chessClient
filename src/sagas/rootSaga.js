import { all, fork } from 'redux-saga/effects'
import {
  watchFetchActiveGames,
  watchCreateGame,
  watchJoinGame,
  watchMachineVsMachineGame
} from './gamesSagas'
import { watchLogin, watchSignUp } from './userSagas'
import { watchFetchChartData } from './sideBarSagas'

export default function* rootSaga() {
  yield all([
    fork(watchFetchActiveGames),
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchCreateGame),
    fork(watchMachineVsMachineGame),
    fork(watchJoinGame),
    fork(watchFetchChartData)
  ])
}
