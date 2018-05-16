export const addChat = (content) => {
  return {
    type: 'ADD_CHAT',
    payload: { currentChatMessage: content }
  }
}

export const clearChat = () => {
  return {
    type: 'CLEAR_CHAT'
  }
}
