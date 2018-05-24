const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_FIELD':
      return action.userData
    case 'LOGOUT':
      return {}
    case 'UPDATE_USER':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default userReducer
