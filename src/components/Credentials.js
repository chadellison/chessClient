import React, { Component } from 'react'
import '../styles/credentials.css'
import { connect } from 'react-redux'
import {loginModalAction} from '../actions/modalActions'

class Credentials extends Component {
  gravatar() {
    return `https://www.gravatar.com/avatar/${this.props.user.hashedEmail}`
  }

  renderCredentialText() {
    if(this.props.user.token) {
      return (
        <div className='row credentials justify-content-center'>
          <img src={ this.gravatar() } alt="gravatar" className='credentialGravatar' />
          <div className='logout' onClick={() => console.log('logout')}>Logout</div>
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
          <div className='signUp' onClick={() => console.log('sign up')}>Sign Up</div>
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
