const modalReducer = (state = { loginModalActive: false, spinnerActive: false }, action) => {
  switch (action.type) {
    case 'LOGIN_MODAL':
      return {...state, loginModalActive: action.active}
    case 'SIGN_UP_MODAL':
      return {...state, signUpModalActive: action.active}
    case 'CREATE_GAME_MODAL':
      return {...state, createGameModalActive: action.active}
    case 'PROMOTE_PAWN_MODAL':
      return {...state, promotePawnModalActive: action.active}
    case 'SPINNER':
      return {...state, spinnerActive: action.active}
    default:
      return state
  }
}

export default modalReducer
