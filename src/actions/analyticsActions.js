export const analyticsAction = (active) => {
  return {
    type: 'ANALYTICS',
    active: active
  }
}

export const updateFocusSquareAction = (focusSquare) => {
  return {
    type: 'UPDATE_FOCUS_SQUARE',
    focusSquare: focusSquare
  }
}

export const fetchAnalyticsDataAction = (pieces, turn, moves) => {
  return {
    type: 'FETCH_ANALYTICS_DATA',
    pieces: pieces,
    turn: turn,
    moves: moves
  }
}

export const updatePieChartDataAction = (analyticsData) => {
  return {
    type: 'UPDATE_PIE_CHART_DATA',
    analyticsData: analyticsData
  }
}

export const updateLineChartDataAction = (analyticsData) => {
  return {
    type: 'UPDATE_LINE_CHART_DATA',
    analyticsData: analyticsData
  }
}
