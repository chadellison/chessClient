const gameReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ACTIVE_GAMES':
      return action.activeGames
    case 'UDPATE_ACTIVE_GAMES':
      return state.map((game) => {
        if (game.id === action.activeGame.id) {
          return action.activeGame
        } else {
          return game
        }
      });
    case 'ADD_ACTIVE_GAME':
      let updatedGames = [...state]
      updatedGames.unshift(action.activeGame)
      return updatedGames
    default:
      return state
  }
}

export default gameReducer
