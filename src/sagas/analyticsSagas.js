import { put, takeEvery, call } from 'redux-saga/effects'
import {updatePieChartDataAction} from '../actions/analyticsActions'
import {getData} from './apiHelper'

export function* watchFetchPieChartData() {
  yield takeEvery('FETCH_PIE_CHART_DATA', fetchPieChartData)
}

export function* fetchPieChartData(action) {
  let {pieces, gameTurnCode} = action.setupData
  let signature = pieces.map((piece) => {
    return piece.positionIndex.toString() + piece.position
  }).join('.') + gameTurnCode

  try {
    const response = yield call(getData, `/api/v1/analytics?setup=${signature}`)
    yield put(updatePieChartDataAction(response.data.attributes))
  }
  catch(err) {
    console.log(err)
  }
}
