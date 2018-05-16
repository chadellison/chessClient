export const updateChatField = (content) => {
  return {
    type: 'UPDATE_CHAT_FIELD',
    payload: { currentChatMessage: content }
  }
}

export const addChat = (newChat) => {
  return {
    type: 'ADD_CHAT',
    newChat: newChat
  }
}

export const clearChat = () => {
  return {
    type: 'CLEAR_CHAT'
  }
}
