const defaultState = {
  loginModalActive: false,
  signUpModalActive: false,
  createGameModalActive: false,
  promotePawnModalActive: false,
  gameOverModalActive: false,
  messagePromptModalActive: false,
  spinnerActive: false,
}

const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_MODAL':
      return {...state, loginModalActive: action.active}
    case 'SIGN_UP_MODAL':
      return {...state, signUpModalActive: action.active}
    case 'CREATE_GAME_MODAL':
      return {...state, createGameModalActive: action.active}
    case 'PROMOTE_PAWN_MODAL':
      return {...state, promotePawnModalActive: action.active}
    case 'GAME_OVER_MODAL':
      return {...state, gameOverModalActive: action.active}
    case 'MESSAGE_PROMPT_MODAL':
      return {...state, messagePromptModalActive: action.active}
    case 'SPINNER':
      return {...state, spinnerActive: action.active}
    default:
      return state
  }
}

export default modalReducer
