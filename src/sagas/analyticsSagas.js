import { put, takeEvery, call } from 'redux-saga/effects'
import {updatePieChartDataAction, updateLineChartDataAction} from '../actions/analyticsActions'
import {getData} from './apiHelper'

export function* watchFetchPieChartData() {
  yield takeEvery('FETCH_PIE_CHART_DATA', fetchPieChartData)
}

export function* watchFetchLineChartData() {
  yield takeEvery('FETCH_LINE_CHART_DATA', fetchLineChartData)
}

export function* fetchPieChartData(action) {
  try {
    const response = yield call(getData, `/api/v1/analytics?setup=${action.signature}`)
    yield put(updatePieChartDataAction(response.data.attributes))
  }
  catch(err) {
    console.log(err)
  }
}

export function* fetchLineChartData(action) {
  console.log('here is where you line chart')
  try {
    const response = yield call(getData, `/api/v1/analytics?setup=${action.signature}`)
    yield put(updateLineChartDataAction(response.data.attributes))
  }
  catch(err) {
    console.log(err)
  }
}
