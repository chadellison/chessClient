const initialState = { pieChartData: [], lineChartData: [], focusSquare: null }

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANALYTICS':
      return {...state, active: action.active }
    case 'UPDATE_PIE_CHART_DATA':
      return {...state, pieChartData: action.pieChartData }
    case 'UPDATE_LINE_CHART_DATA':
      return {...state, lineChartData: action.lineChartData }
    case 'UPDATE_FOCUS_SQUARE':
      return {...state, focusSquare: action.focusSquare }
    default:
      return state
  }
}

export default analyticsReducer
