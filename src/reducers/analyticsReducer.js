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
      let maxValue = 0

      action.analyticsData.moves.forEach((move) => {
        if (move.evaluation > maxValue) {
          maxValue = move.evaluation
        }
      })

      const advantage = (maxValue * 0.25) + 0.5
      const disadvantage = 0.5 - (maxValue * 0.25)
      let chartData = []

      if (action.analyticsData.turn === 'white') {
        chartData[0] = { value: advantage, color: '#cd853f'}
        chartData[1] = { value: disadvantage, color: '#8b4513'}
      } else {
        chartData[1] = { value: advantage, color: '#8b4513'}
        chartData[0] = { value: disadvantage, color: '#cd853f'}
      }


      return {...state, pieChartData: chartData }
    case 'UPDATE_LINE_CHART_DATA':
      return {...state, lineChartData: action.analyticsData.moves }
    case 'UPDATE_FOCUS_SQUARE':
      return {...state, focusSquare: action.focusSquare, focusPiece: action.focusPiece }
    case 'CLEAR_FOCUS_SQUARE':
      return {...state, focusSquare: null, focusPiece: null }
    default:
      return state
  }
}

export default analyticsReducer
