import jsonPieces from '../json/pieces'

const defaultGame = {
  pieces: jsonPieces,
  attributes: {
    currentTurn: 'white',
    whitePlayer: {},
    blackPlayer: {},
    aiPlayer: {},
    notation: ''
  },
  selected: {}
}

const gameReducer = (state = defaultGame, action) => {
  switch (action.type) {
    case 'NEXT_TURN':
      let attributes = state.attributes
      attributes = Object.assign({}, attributes, {currentTurn: action.currentTurn})
      return {...state, attributes: attributes}
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
