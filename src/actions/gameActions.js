export const createGameAction = (gameData, token) => {
  return {
    type: 'CREATE_GAME',
    gameData: gameData,
    token: token
  }
}

export const selectPieceAction = (piece) => {
  return {
    type: 'SELECT_PIECE',
    selected: piece
  }
}

export const updateTurnAction = (nextTurn) => {
  return {
    type: 'NEXT_TURN',
    currentTurn: nextTurn
  }
}

export const updateGamePayload = (payload) => {
  return {
    type: 'UPDATE_GAME',
    payload: payload
  }
}
