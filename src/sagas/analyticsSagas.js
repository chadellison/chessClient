import { put, takeEvery, call } from 'redux-saga/effects'
import {updateAnalyticsDataAction} from '../actions/analyticsActions'
import {getData, postData} from './apiHelper'

export function* watchFetchAnalyticsData() {
  yield takeEvery('FETCH_ANALYTICS_DATA', fetchAnalyticsData)
}

export function* fetchAnalyticsData(action) {
  const body = JSON.stringify({moves: action.moves, signature: action.signature})
  try {
    const response = yield call(postData, '/api/v1/analytics', body)
    yield put(updateAnalyticsDataAction(response.data.attributes))
  }
  catch(error) {
    console.log(error)
  }
}
