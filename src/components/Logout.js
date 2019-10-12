import React from 'react'
import { push } from 'react-router-redux'
import { logoutAction } from '../actions/userActions'
import { connect } from 'react-redux'
import { resetGameAction } from '../actions/gameActions'

const gravatar = (hashedEmail) => {
  return `https://www.gravatar.com/avatar/${hashedEmail}`
}

const handleLogout = (logoutAction, resetGameAction, sockets, push, routing) => {
  logoutAction()
  resetGameAction()
  if (routing !== '/') {
    push('/')
  }

  if (sockets.gameSocket) {
    sockets.gameSocket.unsubscribe()
  }
}

export const Logout = ({user, logoutAction, resetGameAction, push, sockets, routing}) => {
  return (
    <div className='row credentials justify-content-center'>
      <img src={ gravatar(user.hashedEmail) } alt="gravatar" className='credentialGravatar' />
      <div className='logout' onClick={() => handleLogout(logoutAction, resetGameAction, sockets, push, routing)}>
        Logout
      </div>
    </div>
  )
}

const mapStateToProps = ({user, sockets, routing}) => {
  return {user, sockets, routing}
}

const mapDispatchToProps = {
  logoutAction,
  resetGameAction,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
