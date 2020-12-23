import { put, takeEvery, call } from 'redux-saga/effects'
import {getData} from './apiHelper'
import {
  updatePieChartDataAction,
  updateLineChartDataAction
} from '../actions/analyticsActions'

export function* watchFetchAnalyticsData() {
  yield takeEvery('FETCH_ANALYTICS_DATA', fetchAnalyticsData)
}

export function* fetchAnalyticsData(action) {
  try {
    const response = yield call(getData, `/api/v1/analytics?notation=${action.notation}`)
    yield put(updatePieChartDataAction(response.data.attributes))
    yield put(updateLineChartDataAction(response.data.attributes))
  }
  catch(error) {
    console.log(error)
  }
}
