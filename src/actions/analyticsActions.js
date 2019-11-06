export const analyticsAction = (active) => {
  return {
    type: 'ANALYTICS',
    active: active
  }
}

export const updateFocusSquareAction = (focusSquare) => {
  return {
    type: 'UPDATE_FOCUS_SQUARE',
    focusSquare: focusSquare.slice(-2),
    focusPiece: parseInt(focusSquare, 10),
  }
}

export const clearFocusSquare = () => {
  return {
    type: 'CLEAR_FOCUS_SQUARE'
  }
}

export const fetchAnalyticsDataAction = (pieces, turn, notation) => {
  return {
    type: 'FETCH_ANALYTICS_DATA',
    pieces: pieces,
    turn: turn,
    notation: notation
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
