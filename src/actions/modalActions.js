export const loginModalAction = (active) => {
  return {
    type: 'LOGIN_MODAL',
    active: active
  }
}

export const spinnerAction = (active) => {
  return {
    type: 'SPINNER',
    active: active
  }
}
