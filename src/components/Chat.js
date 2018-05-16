import React, { Component } from 'react'
import '../styles/chat.css'
import { connect } from 'react-redux'
import { WEBSOCKET_HOST } from '../config/endpoints.js'
import Cable from 'actioncable'
import {clearChat, addChat} from '../actions/chatActions'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    }
  }

  componentWillMount() {
    this.createChatSocket()
  }

  createChatSocket() {
    let cable = Cable.createConsumer(WEBSOCKET_HOST)
    this.chats = cable.subscriptions.create({
      channel: 'ChatChannel', game_id: '1'
    }, {
      connected: () => {},
      received: (data) => {
        console.log(data)

        let chatLogs = this.state.chatLogs
        chatLogs.unshift(data)
        this.setState({ chatLogs: chatLogs })
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        })
      }
    })
  }

  handleSendEvent = (e) => {
    e.preventDefault()
    this.chats.create(this.state.currentChatMessage)
    this.setState({currentChatMessage: ''})
    // this.props.dispatch(clearChat(''))
  }

  updateCurrentChatMessage = (e) => {
    this.setState({currentChatMessage: e.target.value})
    // this.props.dispatch(addChat(e.target.value))
  }

  renderChatLog = () => {
    return this.state.chatLogs.map((message) => {
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
            value={ this.state.currentChatMessage }
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
