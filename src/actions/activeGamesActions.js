export const loadActiveGamesAction = (activeGames) => {
  return {
    type: 'LOAD_ACTIVE_GAMES',
    activeGames: activeGames
  }
}

export const fetchActiveGamesAction = (activeGames) => {
  return {
    type: 'FETCH_ACTIVE_GAMES'
  }
}
