import React, { Component } from 'react'
import '../styles/credentials.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'
import { logoutAction } from '../actions/userActions'
import { resetGameAction } from '../actions/gameActions'
import { push } from 'react-router-redux'

class Credentials extends Component {
  gravatar() {
    return `https://www.gravatar.com/avatar/${this.props.user.hashedEmail}`
  }

  handleLogout = () => {
    this.props.dispatch(logoutAction())
    this.props.dispatch(resetGameAction())
    if(this.props.routing !== '/') {
      this.props.dispatch(push('/'))
    }

    if (this.props.sockets.gameSocket) {
      this.props.sockets.gameSocket.unsubscribe()
    }
  }

  renderCredentialText() {
    if(this.props.user.token) {
      return (
        <div className='row credentials justify-content-center'>
          <img src={ this.gravatar() } alt="gravatar" className='credentialGravatar' />
          <div className='logout' onClick={this.handleLogout}>Logout</div>
        </div>
      )
    } else {
      return (
        <div className='row credentials justify-content-center'>
          <i className='glyphicon glyphicon-user credentialIcon'
            onClick={() => this.props.dispatch(handleModalAction({login: true}))}/>
            <div className='login' onClick={() => this.props.dispatch(handleModalAction({login: true}))}>
              Login
            </div>
          <div className='signUp' onClick={() => this.props.dispatch(handleModalAction({signUp: true}))}>
            Sign Up
          </div>
        </div>
      )
    }
  }

  render() {
    return this.renderCredentialText()
  }
}

const mapStateToProps = ({user, sockets}) => {
  return {user, sockets}
}

export default connect(mapStateToProps)(Credentials)
