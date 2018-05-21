const gameReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACTIVE_GAMES':
      return action.activeGames
    default:
      return state
  }
}

export default gameReducer
