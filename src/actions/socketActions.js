export const createChatSocketAction = (subscription) => {
  console.log('subscribed to ', JSON.parse(subscription.identifier).channel)
  return {
    type: 'HANDLE_CHAT_SOCKET',
    payload: subscription
  }
}
