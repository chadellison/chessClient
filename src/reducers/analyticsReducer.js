const pieChartData = [
  { value: 0, color: '#cd853f' },
  { value: 0, color: '#8b4513' },
  { value: 0, color: '#333333' }
]

const initialState = {
  active: false,
  pieChartData: pieChartData,
  lineChartData: [],
  focusSquare: null,
  focusPiece: null
}

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANALYTICS':
      return {...state, active: action.active }
    case 'UPDATE_PIE_CHART_DATA':
      let whiteValue = 0
      let blackValue = 0
      action.analyticsData.forEach((moveData) => {
        if (moveData.white > whiteValue) {
          whiteValue = moveData.white
        }
        if (moveData.black > blackValue) {
          blackValue = moveData.black
        }
      })

      let chartData = [
        {value: whiteValue, color: '#cd853f'},
        { value: blackValue, color: '#8b4513' },
        { value: 0, color: '#333333' }
      ]

      return {...state, pieChartData: chartData }
    case 'UPDATE_LINE_CHART_DATA':
      return {...state, lineChartData: action.analyticsData }
    case 'UPDATE_FOCUS_SQUARE':
      return {...state, focusSquare: action.focusSquare, focusPiece: action.focusPiece }
    case 'CLEAR_FOCUS_SQUARE':
      return {...state, focusSquare: null, focusPiece: null }
    default:
      return state
  }
}

export default analyticsReducer
