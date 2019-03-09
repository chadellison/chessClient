export const analyticsAction = (active) => {
  return {
    type: 'ANALYTICS',
    active: active
  }
}

export const fetchPieChartDataAction = (signature) => {
  return {
    type: 'FETCH_PIE_CHART_DATA',
    signature: signature
  }
}

export const updatePieChartDataAction = (pieChartData) => {
  let whiteWinData = {value: pieChartData.whiteWins, color: '#cd853f'}
  let blackWinData = {value: pieChartData.blackWins, color: '#8b4513'}
  let drawData = {value: pieChartData.draws, color: '#333333'}

  return {
    type: 'UPDATE_PIE_CHART_DATA',
    pieChartData: [whiteWinData, blackWinData, drawData]
  }
}

export const fetchLineChartDataAction = (signature, moves) => {
  return {
    type: 'FETCH_LINE_CHART_DATA',
    signature: signature,
    moves: moves
  }
}

export const updateLineChartDataAction = (lineChartData) => {
  return {
    type: 'UPDATE_LINE_CHART_DATA',
    lineChartData: lineChartData
  }
}
