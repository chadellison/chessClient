const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HANDLE_MODAL':
      return action.payload
    case 'SPINNER':
      return {...state, spinnerActive: action.active}
    default:
      return state
  }
}

export default modalReducer
