import { put, takeEvery, call } from 'redux-saga/effects'
import {loadActiveGamesAction, addActiveGameAction} from '../actions/activeGamesActions'
import {updateGamePayload} from '../actions/gameActions'
import {createGameModalAction} from '../actions/modalActions'
import {getData, postData} from './apiHelper'
import { push } from 'react-router-redux'

export function* watchFetchActiveGames() {
  yield takeEvery('FETCH_ACTIVE_GAMES', fetchGames)
}

export function* watchCreateGame() {
  yield takeEvery('CREATE_GAME', createGame)
}

export function* fetchGames(action) {
  try {
    const response = yield call(getData, `/api/v1/games?token=${action.token}`)
    yield put(loadActiveGamesAction(response.data))
  }
  catch(err) {
    console.log(err)
  }
}

export function* createGame(action) {
  let body = JSON.stringify({ game_data: action.gameData })
  try {
    const response = yield call(postData, `/api/v1/games?token=${action.token}`, body)
    yield put(addActiveGameAction(response.data))
    yield put(createGameModalAction(false))
    yield put(push(`/games/${response.data.id}`))
  }
  catch(err) {
    yield put(updateGamePayload({errors: true}))
    console.log(err)
  }
}
