export const loginModalAction = (active) => {
  return {
    type: 'LOGIN_MODAL',
    active: active
  }
}

export const signUpModalAction = (active) => {
  return {
    type: 'SIGN_UP_MODAL',
    active: active
  }
}

export const createGameModalAction = (active) => {
  return {
    type: 'CREATE_GAME_MODAL',
    active: active
  }
}

export const spinnerAction = (active) => {
  return {
    type: 'SPINNER',
    active: active
  }
}
