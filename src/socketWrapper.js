import { WEBSOCKET_HOST } from './config/endpoints.js'
import Cable from 'actioncable'

export class SocketWrapper {
  constructor() {
    this.gameSocket = {}
    this.chatSocket = {}
  }
  createGameSocket = (gameId, handleReceivedData) => {
    const cable = Cable.createConsumer(WEBSOCKET_HOST)

    this.gameSocket = cable.subscriptions.create(
      { channel: 'GameChannel', game_id: gameId },
      { connected: () => {},
        received: handleReceivedData,
        update: function(gameData) {
          this.perform('update', gameData)
        }
      }
    )
  }

  createChatSocket = (gameId, chatChannel, handleReceivedData) => {
    const cable = Cable.createConsumer(WEBSOCKET_HOST)
    this.chatSocket = cable.subscriptions.create({ channel: chatChannel, game_id: gameId },
    {
      connected: () => {},
      received: handleReceivedData,
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent,
          game_id: gameId
        })
      }
    })
  }
}

export default new SocketWrapper()
