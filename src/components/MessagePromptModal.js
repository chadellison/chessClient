import React, { Component } from 'react'
import '../styles/messagePromptModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

class MessagePromptModal extends Component {
  handleCreateGameModal = () => {
    this.props.dispatch(handleModalAction({createGame: true, messagePrompt: false}))
  }

  render() {
    return (
      <div className='modalContainer' hidden={!this.props.modals.messagePrompt}>
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
  }
}

const mapStateToProps = ({modals}) => {
  return {modals}
}

export default connect(mapStateToProps)(MessagePromptModal)
