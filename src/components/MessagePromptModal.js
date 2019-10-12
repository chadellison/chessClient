import React from 'react'
import '../styles/messagePromptModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

export const MessagePromptModal = ({modals, handleModalAction}) => {
  return (
    <div className='modalContainer' hidden={!modals.messagePrompt}>
      <div className='messagePromptModal col-sm-offset-4 col-md-4'>
        <div className='messagePromptModalTop'></div>
        <div className='messageText'>
          There are no open games at this time. Would you like to create one?
        </div>
        <div
          onClick={() => handleModalAction({createGame: true, messagePrompt: false})}
            className='yesPromptButton'>
            Yes
        </div>
        <div onClick={() => handleModalAction({messagePrompt: false})}
          className='noPromptButton'>
            No
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({modals}) => {
  return {modals}
}

const mapDispatchToProps = {
  handleModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePromptModal)
