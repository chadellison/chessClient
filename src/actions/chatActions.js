export const updateChatFieldAction = (content) => {
  return {
    type: 'UPDATE_CHAT_FIELD',
    payload: { currentChatMessage: content }
  }
}

export const addChatAction = (newChat) => {
  return {
    type: 'ADD_CHAT',
    newChat: newChat
  }
}

export const clearChatAction = () => {
  return {
    type: 'CLEAR_CHAT'
  }
}

export const updateChatChannelAction = (channel) => {
  return {
    type: 'UPDATE_CHAT_CHANNEL',
    channel: channel
  }
}
