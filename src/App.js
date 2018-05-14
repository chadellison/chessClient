import React, { Component } from 'react'
import Cable from 'actioncable'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    }
  }

  componentWillMount() {
    this.createSocket()
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    })
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3001/cable')
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel', game_id: '1'
    }, {
      connected: () => {},
      received: (data) => {
        console.log(data)

        let chatLogs = this.state.chatLogs
        chatLogs.push(data)
        this.setState({ chatLogs: chatLogs })
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        })
      }
    })
  }

  handleSendEvent(event) {
    event.preventDefault()
    this.chats.create(this.state.currentChatMessage)
    this.setState({
      currentChatMessage: ''
    })
  }

  renderChatLog() {
    return this.state.chatLogs.map((chat) => {
      return (
        <li key={`chat_${chat.id}`}>
          <span className='chat-message'>{ chat.content }</span>
          <span className='chat-created-at'>{ chat.created_at }</span>
        </li>
      )
    })
  }

  handleChatInputKeyPress(event) {
    if(event.key === 'Enter') {
      this.handleSendEvent(event);
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='stage'>
          <h1>Chat</h1>
          <div className='chat-logs'>
          </div>
          <input
            type='text'
            value={ this.state.currentChatMessage }
            onChange={ (e) => this.updateCurrentChatMessage(e) }
            placeholder='Enter your message...'
            className='chat-input'
            onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
          />

          <button className='send'
            onClick={ (e) => this.handleSendEvent(e) }>
            Send
          </button>
          <ul className='chat-logs'>
            { this.renderChatLog() }
          </ul>
        </div>
      </div>
    )
  }
}

export default App
