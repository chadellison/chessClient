const pieChartData = [
  { value: 0, color: '#cd853f' },
  { value: 0, color: '#8b4513' },
  { value: 0, color: '#333333' }
]

const initialState = {
  active: false,
  pieChartData: pieChartData,
  lineChartData: [],
  focusSquare: null
}

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANALYTICS':
      return {...state, active: action.active }
    case 'UPDATE_PIE_CHART_DATA':
    let chartData = [
      {value: 0, color: '#cd853f'},
      { value: 0, color: '#8b4513' },
      { value: 0, color: '#333333' }
    ]
    action.analyticsData.forEach((moveData) => {
      if (moveData.white < 1 && moveData.white > -1) {
        chartData[2].value += 1
      } else if (moveData.white > 1) {
        chartData[0].value += moveData.white
      } else {
        chartData[1].value += (moveData.black)
      }
    })
      return {...state, pieChartData: chartData }
    case 'UPDATE_LINE_CHART_DATA':
      return {...state, lineChartData: action.analyticsData }
    case 'UPDATE_FOCUS_SQUARE':
      return {...state, focusSquare: action.focusSquare }
    default:
      return state
  }
}

export default analyticsReducer
