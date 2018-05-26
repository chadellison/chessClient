export const createChatSocketAction = (subscription) => {
  console.log('subscribed to ', JSON.parse(subscription.identifier).channel)
  return {
    type: 'HANDLE_CHAT_SOCKET',
    payload: subscription
  }
}

export const createGameSocketAction = (subscription) => {
  console.log('subscribed to game')
  return {
    type: 'HANDLE_GAME_SOCKET',
    payload: subscription
  }
}
