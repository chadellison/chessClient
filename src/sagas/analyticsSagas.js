import { put, takeEvery, call } from 'redux-saga/effects'
import {updateAnalyticsDataAction} from '../actions/analyticsActions'
import {postData} from './apiHelper'

export function* watchFetchAnalyticsData() {
  yield takeEvery('FETCH_ANALYTICS_DATA', fetchAnalyticsData)
}

export function* fetchAnalyticsData(action) {
  const body = JSON.stringify({ pieces: action.pieces, turn: action.turn, moves: action.moves })
  try {
    const response = yield call(postData, '/api/v1/analytics', body)
    yield put(updateAnalyticsDataAction(response.data.attributes))
  }
  catch(error) {
    console.log(error)
  }
}
