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
