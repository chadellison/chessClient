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

export const fetchChartDataAction = (positionSignature) => {
  return {
    type: 'FETCH_CHART_DATA',
    positionSignature: positionSignature
  }
}

export const updateChartDataAction = (chartData) => {
  return {
    type: 'UPDATE_CHART_DATA',
    chartData: chartData
  }
}
