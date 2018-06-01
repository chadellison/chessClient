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

export const promotePawnModalAction = (active) => {
  return {
    type: 'PROMOTE_PAWN_MODAL',
    active: active
  }
}

export const gameOverModalAction = (active) => {
  return {
    type: 'GAME_OVER_MODAL',
    active: active
  }
}

export const spinnerAction = (active) => {
  return {
    type: 'SPINNER',
    active: active
  }
}
