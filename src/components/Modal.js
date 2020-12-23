import React from 'react'
import '../styles/sideBar.css'
import { connect } from 'react-redux'
import LoginModal from './LoginModal'
import CreateGameModal from './CreateGameModal'
import PromotePawnModal from './PromotePawnModal'
import GameOverModal from './GameOverModal'
import MessagePromptModal from './MessagePromptModal'

export const Modal = ({modals}) => {
  if (modals.signUp || modals.login) {
    return <LoginModal />
  } else if (modals.createGame) {
    return <CreateGameModal />
  } else if (modals.gameOver) {
    return <GameOverModal />
  } else if (modals.messagePrompt) {
    return <MessagePromptModal />
  } else if (modals.promotePawn) {
    return <PromotePawnModal />
  } else {
    return ''
  }
}

const mapStateToProps = ({modals}) => {
  return {modals}
}

export default connect(mapStateToProps)(Modal)
