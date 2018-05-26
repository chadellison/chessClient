const defaultChat = { chatLogs: [], currentChatMessage: '', channel: 'GroupChatChannel'}

const chatReducer = (state = defaultChat, action) => {
  switch (action.type) {
    case 'ADD_CHAT':
      let updateDatedChats = state.chatLogs
      updateDatedChats.unshift(action.newChat)
      return Object.assign({}, state, { chatLogs: updateDatedChats })
    case 'UPDATE_CHAT_FIELD':
      return Object.assign({}, state, action.payload)
    case 'CLEAR_CHAT':
      return Object.assign({}, state, { currentChatMessage: '' })
    case 'CLEAR_ALL_CHATS':
      return Object.assign({}, state, { chatLogs: [] })
    case 'UPDATE_CHAT_CHANNEL':
      return Object.assign({}, state, { channel: action.channel })
    default:
      return state
  }
}

export default chatReducer
