import React, { Component } from 'react'
import '../styles/messagePromptModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

class MessagePromptModal extends Component {
  handleCreateGameModal = () => {
    this.props.dispatch(handleModalAction({createGame: true, messagePrompt: false}))
  }

  messagePromptModal = () => {
    if(this.props.modals.messagePrompt) {
      return (
        <div className='modalContainer'>
          <div className='messagePromptModal col-sm-offset-4 col-md-4'>
            <div className='messagePromptModalTop'></div>
            <div className='messageText'>
              There are no open games at this time. Would you like to create one?
            </div>
            <div onClick={this.handleCreateGameModal} className='yesPromptButton'>
                Yes
            </div>
            <div onClick={() => this.props.dispatch(handleModalAction({messagePrompt: false}))}
              className='noPromptButton'>
                No
            </div>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.messagePromptModal()
  }
}

const mapStateToProps = ({modals}) => {
  return {modals}
}

export default connect(mapStateToProps)(MessagePromptModal)
