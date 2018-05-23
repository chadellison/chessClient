import React, { Component } from 'react'
import '../styles/credentials.css'
import { connect } from 'react-redux'
import {loginModalAction, signUpModalAction} from '../actions/modalActions'
import {logoutAction} from '../actions/userActions'
import { push } from 'react-router-redux'

class Credentials extends Component {
  gravatar() {
    return `https://www.gravatar.com/avatar/${this.props.user.hashedEmail}`
  }

  handleLogout = () => {
    this.props.dispatch(logoutAction())
    if(this.props.routing !== '/') {
      this.props.dispatch(push('/'))
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
            onClick={() => this.props.dispatch(loginModalAction(true))}/>
            <div className='login' onClick={() => this.props.dispatch(loginModalAction(true))}>
              Login
            </div>
          <div className='signUp' onClick={() => this.props.dispatch(signUpModalAction(true))}>
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

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps)(Credentials)