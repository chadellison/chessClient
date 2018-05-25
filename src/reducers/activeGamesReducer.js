const gameReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACTIVE_GAMES':
      return action.activeGames
    case 'ADD_ACTIVE_GAME':
      let updatedGames = state
      updatedGames.unshift(action.activeGame)
      return updatedGames
    default:
      return state
  }
}

export default gameReducer
