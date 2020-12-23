import React from 'react'
import '../styles/messagePromptModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

const MessagePromptModal = ({handleModalAction}) => {
  return (
    <div className='modalContainer'>
      <div className='messagePromptModal col-sm-offset-4 col-md-4'>
        <div className='messagePromptModalTop'></div>
        <div className='messageText'>
          There are no open games at this time. Would you like to create one?
        </div>
        <div onClick={() => handleModalAction({createGame: true, messagePrompt: false})} className='yesPromptButton'>
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

const mapDispatchToProps = {
  handleModalAction,
}

export default connect({}, mapDispatchToProps)(MessagePromptModal)
