export const loadActiveGamesAction = (activeGames) => {
  return {
    type: 'LOAD_ACTIVE_GAMES',
    activeGames: activeGames
  }
}

export const addActiveGameAction = (activeGame) => {
  return {
    type: 'ADD_ACTIVE_GAME',
    activeGame: activeGame
  }
}

export const fetchActiveGamesAction = (token) => {
  return {
    type: 'FETCH_ACTIVE_GAMES',
    token: token
  }
}
