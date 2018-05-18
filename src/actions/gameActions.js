export const loadPiecesAction = (pieces) => {
  return {
    type: 'LOAD_PIECES',
    pieces: pieces
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
