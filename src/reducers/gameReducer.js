const defaultGame = {
  pieces: [],
  currentTurn: 'white',
  attributes: {
    whitePlayer: {},
    blackPlayer: {}
  }
}

const gameReducer = (state = defaultGame, action) => {
  switch (action.type) {
    case 'NEXT_TURN':
      return {...state, currentTurn: action.currentTurn}
    case 'SELECT_PIECE':
      return {...state, selected: action.selected}
    case 'UPDATE_GAME':
      return Object.assign({}, state, action.payload)
    case 'RESET_GAME':
      return defaultGame
    default:
      return state
  }
}

export default gameReducer
