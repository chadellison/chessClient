export const analyticsAction = (active) => {
  return {
    type: 'ANALYTICS',
    active: active
  }
}

export const fetchPieChartDataAction = (setupData) => {
  return {
    type: 'FETCH_PIE_CHART_DATA',
    setupData: setupData
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