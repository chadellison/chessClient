const moveLogReducer = (state = { index: 0 }, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MOVE':
      return { index: action.index }
    default:
      return state
  }
}

export default moveLogReducer
