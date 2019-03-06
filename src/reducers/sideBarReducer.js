const sideBarReducer = (state = {moveLogActive: false}, action) => {
  switch (action.type) {
    case 'MOVE_LOG':
      return {...state, moveLogActive: action.active}
    default:
      return state
  }
}

export default sideBarReducer
