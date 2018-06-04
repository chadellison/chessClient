const sideBarReducer = (state = { chartData: [] }, action) => {
  switch (action.type) {
    case 'MOVE_LOG':
      return {...state, moveLogActive: action.active}
    case 'ANALYTICS':
      return {...state, analyticsActive: action.active}
    case 'UPDATE_CHART_DATA':
      return {...state, chartData: action.chartData}
    default:
      return state
  }
}

export default sideBarReducer
