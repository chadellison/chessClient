const initialState = { pieChartData: [], lineChartData: [] }

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANALYTICS':
      return {...state, active: action.active}
    case 'UPDATE_PIE_CHART_DATA':
      return {...state, pieChartData: action.pieChartData}
    case 'UPDATE_LINE_CHART_DATA':
      return {...state, lineChartData: action.lineChartData}
    default:
      return state
  }
}

export default analyticsReducer
