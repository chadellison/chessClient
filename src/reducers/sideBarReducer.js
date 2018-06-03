const sideBarReducer = (state = {}, action) => {
  switch (action.type) {
    case 'MOVE_LOG':
      return {...state, moveLogActive: action.active}
    case 'ANALYTICS':
      return {...state, analyticsActive: action.active}
    default:
      return state
  }
}

export default sideBarReducer
