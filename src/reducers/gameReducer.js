const gameReducer = (state = { pieces: [] }, action) => {
  switch (action.type) {
    case 'LOAD_PIECES':
      return Object.assign({}, state, { pieces: action.pieces})
    case 'SELECT_PIECE':
      return Object.assign({}, state, { selected: action.selected})
    default:
      return state
  }
}

export default gameReducer
