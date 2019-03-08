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

export const updatePieChartDataAction = (data) => {
  let whiteWinData = {value: data.whiteWins, color: '#cd853f'}
  let blackWinData = {value: data.blackWins, color: '#8b4513'}
  let drawData = {value: data.draws, color: '#333333'}

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

export const updateLineChartDataAction = (data) => {
  // let whiteWinData = {value: data.whiteWins, color: '#cd853f'}
  // let blackWinData = {value: data.blackWins, color: '#8b4513'}
  // let drawData = {value: data.draws, color: '#333333'}
  console.log('thing here')
  return {
    type: 'UPDATE_LINE_CHART_DATA',
    // pieChartData: [whiteWinData, blackWinData, drawData]
  }
}
