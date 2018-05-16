const chatReducer = (state = { chatLogs: [], currentChatMessage: ''}, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      return Object.assign({}, state, action.payload)
    case 'CLEAR_CHAT':
      return Object.assign({}, state, { currentChatMessage: '' })
    default:
      return state
  }
}

export default chatReducer
