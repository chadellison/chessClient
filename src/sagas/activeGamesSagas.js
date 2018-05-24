import { put, takeEvery, call } from 'redux-saga/effects'
import {loadActiveGamesAction} from '../actions/activeGamesActions'
import {fetchGames} from './apiHelper'

export function* watchFetchActiveGames() {
  yield takeEvery('FETCH_ACTIVE_GAMES', fetchActiveGames)
}

export function* fetchActiveGames(token) {
  try {
    const activeGames = yield call(fetchGames, token)
    yield put(loadActiveGamesAction(activeGames.data))
  }
  catch(err) {
    console.log(err)
  }
}
