import { put, takeEvery, call } from 'redux-saga/effects'
import {updateChartDataAction} from '../actions/sideBarActions'
import {getData} from './apiHelper'

export function* watchFetchChartData() {
  yield takeEvery('FETCH_CHART_DATA', fetchChartData)
}

export function* fetchChartData(action) {
  try {
    const response = yield call(getData, `/api/v1/analytics?signature=${action.positionSignature}`)
    yield put(updateChartDataAction(response.data))
  }
  catch(err) {
    console.log(err)
  }
}
