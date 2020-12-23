export const updateBoardAction = (board) => {
  return {
    type: 'UPDATE_BOARD',
    board,
  }
}

export const resetBoardAction = () => {
  return {
    type: 'RESET_BOARD',
  }
}
