import { put, takeEvery, call } from 'redux-saga/effects'
import {loadActiveGamesAction, addActiveGameAction} from '../actions/activeGamesActions'
import {updateGamePayload} from '../actions/gameActions'
import {handleModalAction, spinnerAction} from '../actions/modalActions'
import {getData, postData} from './apiHelper'
import { push } from 'react-router-redux'

export function* watchFetchActiveGames() {
  yield takeEvery('FETCH_ACTIVE_GAMES', fetchGames)
}
export function* watchFetchAllGames() {
  yield takeEvery('FETCH_ALL_GAMES', fetchAllGames)
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
  const response = yield call(getData, `/api/v1/games?token=${action.token}`)
  yield put(loadActiveGamesAction(response.data))
}

export function* fetchAllGames() {
  const response = yield call(getData, '/api/v1/all_games')
  yield put(loadActiveGamesAction(response.data))
}

export function* watchFindGame() {
  yield takeEvery('FIND_GAME', findGame)
}

export function* findGame(action) {
    const response = yield call(getData, `/api/v1/all_games/${action.gameId}`);
    if (response.error) {
      yield put(push('/'))
    } else {
      yield put(updateGamePayload(response.data));
    }
}

export function* createGame(action) {
  const body = JSON.stringify({ game_data: action.gameData })
  const response = yield call(postData, `/api/v1/games?token=${action.token}`, body)
  yield put(addActiveGameAction(response.data))
  yield put(handleModalAction({createGame: false}))
  yield put(push(`/games/${response.data.id}`))

  if (response.error) {
    yield put(updateGamePayload({errors: true}))
  }
  yield put(spinnerAction(false))
}

export function* machineVsMachineGame(action) {
  const body = JSON.stringify({ game_data: action.gameData });
  const response = yield call(postData, `/api/v1/machine_vs_machine?token=${action.token}`, body);
  yield put(addActiveGameAction(response.data));
  yield put(handleModalAction({createGame: false}));
  yield put(push(`/games/${response.data.id}`));

  if (response.error) {
    yield put(updateGamePayload({errors: true}));
  }
  yield put(spinnerAction(false));
}

export function* joinGame(action) {
  const response = yield call(getData, `/api/v1/find_game?token=${action.token}`);
  if (response.data.id) {
    yield put(addActiveGameAction(response.data));
    yield put(push(`/games/${response.data.id}`));
  } else {
    yield put(handleModalAction({messagePrompt: true}));
  }
}
