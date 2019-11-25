const moveLogReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MOVE':
      return { selectedMove: action.selectedMove }
    default:
      return state
  }
}

export default moveLogReducer
