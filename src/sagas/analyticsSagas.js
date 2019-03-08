import { put, takeEvery, call } from 'redux-saga/effects'
import {updatePieChartDataAction, updateLineChartDataAction} from '../actions/analyticsActions'
import {getData, postData} from './apiHelper'

export function* watchFetchPieChartData() {
  yield takeEvery('FETCH_PIE_CHART_DATA', fetchPieChartData)
}

export function* watchFetchLineChartData() {
  yield takeEvery('FETCH_LINE_CHART_DATA', fetchLineChartData)
}

export function* fetchPieChartData(action) {
  try {
    const response = yield call(getData, `/api/v1/analytics?signature=${action.signature}`)
    yield put(updatePieChartDataAction(response.data.attributes))
  }
  catch(error) {
    console.log(error)
  }
}

export function* fetchLineChartData(action) {
  console.log('here is where you line chart')
  const body = JSON.stringify({moves: action.moves, signature: action.signature})
  try {
    const response = yield call(postData, '/api/v1/analytics', body)
    yield put(updateLineChartDataAction(response.data.attributes))
  }
  catch(err) {
    console.log(err)
  }
}
