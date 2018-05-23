const gameReducer = (state = { pieces: [], currentTurn: 'white' }, action) => {
  switch (action.type) {
    case 'LOAD_PIECES':
      return {...state, pieces: action.pieces}
    case 'NEXT_TURN':
      return {...state, currentTurn: action.currentTurn}
    case 'SELECT_PIECE':
      return {...state, selected: action.selected}
    case 'UPDATE_GAME':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}

export default gameReducer
