export const createGameAction = (gameData, token) => {
  return {
    type: 'CREATE_GAME',
    gameData: gameData,
    token: token
  }
}

export const machineVsMachineGameAction = (gameData, token) => {
  return {
    type: 'MACHINE_VS_MACHINE_GAME',
    gameData: gameData,
    token: token
  }
}

export const joinGameAction = (token) => {
  return {
    type: 'JOIN_GAME',
    token: token
  }
}

export const findGameAction = (gameId) => {
  return {
    type: 'FIND_GAME',
    gameId,
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

export const resetGameAction = () => {
  return {
    type: 'RESET_GAME'
  }
}
