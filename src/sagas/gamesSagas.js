import { put, takeEvery, call } from 'redux-saga/effects'
import {loadActiveGamesAction, addActiveGameAction} from '../actions/activeGamesActions'
import {updateGamePayload} from '../actions/gameActions'
import {handleModalAction, spinnerAction} from '../actions/modalActions'
import {getData, postData} from './apiHelper'
import { push } from 'react-router-redux'

export function* watchFetchActiveGames() {
  yield takeEvery('FETCH_ACTIVE_GAMES', fetchGames)
}

export function* watchCreateGame() {
  yield takeEvery('CREATE_GAME', createGame)
}

export function* watchMachineVsMachineGame() {
  yield takeEvery('MACHINE_VS_MACHINE_GAME', machineVsMachineGame)
}

export function* watchJoinGame() {
  yield takeEvery('JOIN_GAME', joinGame)
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
    yield put(handleModalAction({createGame: false}))
    yield put(push(`/games/${response.data.id}`))
  }
  catch(err) {
    yield put(updateGamePayload({errors: true}))
    console.log(err)
  }
  yield put(spinnerAction(false))
}

export function* machineVsMachineGame(action) {
  let body = JSON.stringify({ game_data: action.gameData })
  try {
    const response = yield call(postData, `/api/v1/machine_vs_machine?token=${action.token}`, body)
    yield put(addActiveGameAction(response.data))
    yield put(handleModalAction({createGame: false}))
    yield put(push(`/games/${response.data.id}`))
  }
  catch(err) {
    yield put(updateGamePayload({errors: true}))
    console.log(err)
  }
  yield put(spinnerAction(false))
}

export function* joinGame(action) {
  try {
    const response = yield call(getData, `/api/v1/find_game?token=${action.token}`)
    if (response.data.id) {
      yield put(addActiveGameAction(response.data))
      yield put(push(`/games/${response.data.id}`))
    } else {
      yield put(handleModalAction({messagePrompt: true}))
    }
  }
  catch(err) {
    console.log(err)
  }
}
