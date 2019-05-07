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

export const updateAnalyticsDataAction = (analyticsData) => {
  return {
    type: 'UPDATE_ANALYTICS_DATA',
    analyticsData: analyticsData
  }
}
