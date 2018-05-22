const modalReducer = (state = { loginModalActive: false }, action) => {
  switch (action.type) {
    case 'LOGIN_MODAL':
      return {...state, loginModalActive: action.active}
    default:
      return state
  }
}

export default modalReducer
