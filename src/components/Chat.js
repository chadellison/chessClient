import React, { Component } from 'react'
import '../styles/chat.css'
import { connect } from 'react-redux'
import { WEBSOCKET_HOST } from '../config/endpoints.js'
import Cable from 'actioncable'
import {clearChat, addChat, updateChatField} from '../actions/chatActions'

class Chat extends Component {
  componentWillMount() {
    this.createChatSocket()
  }

  createChatSocket() {
    let cable = Cable.createConsumer(WEBSOCKET_HOST)
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel', game_id: '1'
    }, {
      connected: () => {},
      received: (data) => this.props.dispatch(addChat(data)),
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        })
      }
    })
  }

  handleSendEvent = (e) => {
    e.preventDefault()
    this.chats.create(this.props.chat.currentChatMessage)
    this.props.dispatch(clearChat(''))
  }

  updateCurrentChatMessage = (e) => {
    this.props.dispatch(updateChatField(e.target.value))
  }

  renderChatLog = () => {
    return this.props.chat.chatLogs.map((message) => {
      return (
        <div key={`chat_${message.id}`} className='chat'>
          <span className='chat-message'>{message.content}</span>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='chatroom'>
        <h3 className='chatTitle'>Message</h3>
        <div className='chats'>
          { this.renderChatLog() }
        </div>
        <form className='inputForm' onSubmit={(e) => this.handleSendEvent(e)}>
          <input
            value={ this.props.chat.currentChatMessage }
            onChange={ (e) => this.updateCurrentChatMessage(e) }
            type='text'
            placeholder=''
            className='chat-input' />
          <input type='submit' className='submitButton'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({chat}) => {
  return {chat}
}

export default connect(mapStateToProps)(Chat)
