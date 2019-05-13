import { put, takeEvery, call } from 'redux-saga/effects'
import {postData} from './apiHelper'
import {
  updatePieChartDataAction,
  updateLineChartDataAction
} from '../actions/analyticsActions'

export function* watchFetchAnalyticsData() {
  yield takeEvery('FETCH_ANALYTICS_DATA', fetchAnalyticsData)
}

export function* fetchAnalyticsData(action) {
  const body = JSON.stringify({ pieces: action.pieces, turn: action.turn, moves: action.moves })
  try {
    const response = yield call(postData, '/api/v1/analytics', body)
    yield put(updatePieChartDataAction(response.data.attributes))
    yield put(updateLineChartDataAction(response.data.attributes))
  }
  catch(error) {
    console.log(error)
  }
}
