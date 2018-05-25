import { put, takeEvery, call } from 'redux-saga/effects'
import {loadActiveGamesAction} from '../actions/activeGamesActions'
import {updateGamePayload} from '../actions/gameActions'
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
    let updatedGame = response.data.attributes
    updatedGame.id = response.data.id
    yield put(updateGamePayload(updatedGame))
    yield put(push(`/games/${updatedGame.id}`))
  }
  catch(err) {
    console.log(err)
  }
}
