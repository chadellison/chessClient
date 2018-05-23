const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SUCCESSFUL_LOGIN':
      return action.userData
    case 'LOGOUT':
      return {}
    case 'FAILED_LOGIN':
      return action.userData
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default userReducer
