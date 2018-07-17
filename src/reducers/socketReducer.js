const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case 'HANDLE_GAME_SOCKET':
      return Object.assign({}, state, { gameSocket: action.payload })
    case 'HANDLE_CHAT_SOCKET':
      return Object.assign({}, state, { chatSocket: action.payload })
    default:
      return state
  }
}

export default socketReducer
