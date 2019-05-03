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

export const fetchAnalyticsDataAction = (signature, moves) => {
  return {
    type: 'FETCH_ANALYTICS_DATA',
    signature: signature,
    moves: moves
  }
}

export const updateAnalyticsDataAction = (analyticsData) => {
  return {
    type: 'UPDATE_ANALYTICS_DATA',
    analyticsData: analyticsData
  }
}
