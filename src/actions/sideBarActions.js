export const moveLogAction = (active) => {
  return {
    type: 'MOVE_LOG',
    active: active
  }
}

export const analyticsAction = (active) => {
  return {
    type: 'ANALYTICS',
    active: active
  }
}

export const fetchChartDataAction = (notation) => {
  return {
    type: 'FETCH_CHART_DATA',
    notation: notation
  }
}

export const updateChartDataAction = (data) => {
  let whiteWinData = {value: data.whiteWins, color: '#cd853f'}
  let blackWinData = {value: data.blackWins, color: '#8b4513'}
  let drawData = {value: data.draws, color: '#333333'}

  return {
    type: 'UPDATE_CHART_DATA',
    chartData: [whiteWinData, blackWinData, drawData]
  }
}
