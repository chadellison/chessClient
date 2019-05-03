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
    case 'UPDATE_ANALYTICS_DATA':
      let pieChartData = { white: 0, black: 0, draws: 0 }
      action.analyticsData.forEach((moveData) => {
        if (moveData.white < 1 && moveData.white > -1) {
          pieChartData.draws += 1
        } else if (moveData.white > 1) {
          pieChartData.white += moveData.white
        } else {
          pieChartData.black += (moveData.black)
        }
      })
      console.log('w', pieChartData.white)
      console.log('b', pieChartData.black)
      let white = {value: pieChartData.white, color: '#cd853f'}
      let black = {value: pieChartData.black, color: '#8b4513'}
      let draws = {value: pieChartData.draws, color: '#333333'}

      return {...state, lineChartData: action.analyticsData, pieChartData: [white, black, draws] }
    case 'UPDATE_FOCUS_SQUARE':
      return {...state, focusSquare: action.focusSquare }
    default:
      return state
  }
}

export default analyticsReducer
