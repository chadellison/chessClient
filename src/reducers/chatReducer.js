const chatReducer = (state = { chatLogs: [], currentChatMessage: ''}, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      let updateDatedChats = state.chatLogs
      updateDatedChats.unshift(action.newChat)
      return Object.assign({}, state, { chatLogs: updateDatedChats })
    case 'UPDATE_CHAT_FIELD':
      return Object.assign({}, state, action.payload)
    case 'CLEAR_CHAT':
      return Object.assign({}, state, { currentChatMessage: '' })
    default:
      return state
  }
}

export default chatReducer
