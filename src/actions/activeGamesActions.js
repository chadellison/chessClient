export const loadActiveGamesAction = (activeGames) => {
  return {
    type: 'LOAD_ACTIVE_GAMES',
    activeGames: activeGames
  }
}

export const updateActiveGamesAction = (activeGame) => {
  return {
    type: 'UDPATE_ACTIVE_GAMES',
    activeGame: activeGame
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

export const fetchAllGamesAction = () => {
  return {
    type: 'FETCH_ALL_GAMES',
  }
}
