const DEFAULT_GAME_STATE = {
  id: 'default',
  notation: '',
  selected: {},
  promotedPawn: {},
  previousSetup: ''
}

const gameReducer = (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case 'SELECT_PIECE':
      return {...state, selected: action.selected}
    case 'UPDATE_GAME':
      return Object.assign({}, state, action.payload)
    case 'RESET_GAME':
      return DEFAULT_GAME_STATE
    default:
      return state
  }
}

export default gameReducer
