import pieces from '../json/pieces'

const gameReducer = (state = { pieces: [] }, action) => {
  switch (action.type) {
    case 'LOAD_PIECES':
      return Object.assign({}, state, { pieces: pieces})
    default:
      return state
  }
}

export default gameReducer
