const analyticsReducer = (state = { pieChartData: [] }, action) => {
  switch (action.type) {
    case 'ANALYTICS':
      return {...state, active: action.active}
    case 'UPDATE_PIE_CHART_DATA':
      return {...state, pieChartData: action.pieChartData}
    default:
      return state
  }
}

export default analyticsReducer
