export const createChatSocketAction = (subscription) => {
  console.log('subscribed to chat channel')
  return {
    type: 'HANDLE_CHAT_SOCKET',
    payload: subscription
  }
}

export const closeChatSocketAction = (subscription) => {
  console.log('unsubscribed from chat channel')
  return {
    type: 'HANDLE_CHAT_SOCKET',
    payload: subscription ? subscription.unsubscribe() : {}
  }
}
