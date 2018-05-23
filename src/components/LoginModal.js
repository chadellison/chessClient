import React, { Component } from 'react'
import '../styles/loginModal.css'
import { connect } from 'react-redux'
import {loginModalAction, spinnerAction} from '../actions/modalActions'
import {loginAction, updateUserAction} from '../actions/userActions'
import Spinner from './Spinner'

class LoginModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(loginModalAction(false))
    this.props.dispatch(updateUserAction({loginFailed: false}))
  }

  handleLogin = (e) => {
    e.preventDefault()
    let credentials = {
      email: e.target.emailInput.value, password: e.target.passwordInput.value
    }
    this.props.dispatch(spinnerAction(true))
    this.props.dispatch(updateUserAction({loginFailed: false}))
    this.props.dispatch(loginAction(credentials))
  }

  handleSignUpLink = () => {
    console.log('signUp')
  }

  invalidCredentials() {
    if(this.props.user.loginFailed) {
      return (
        <h3 className='invalidCredentialsText'>Invalid Credentials</h3>
      )
    } else {
      return ''
    }
  }

  displaySpinner() {
    if(this.props.modals.spinnerActive) {
      return <Spinner />
    } else {
      return ''
    }
  }

  loginModal = () => {
    if(this.props.modals.loginModalActive) {
      return (
        <div className='modalContainer'>
          <form className='loginModal col-sm-offset-5 col-md-2' onSubmit={(e) => this.handleLogin(e)}>
            {this.displaySpinner()}
            {this.invalidCredentials()}
            <h4 className='emailTitle'>Email</h4>
            <input className='emailInput' id='emailInput'></input>
            <h4 className='passwordTitle'>Password</h4>
            <input className='passwordInput' id='passwordInput' type='password'/>
            <br/>
            <input type='submit' className='submitLogin'/>
            <br/>
            <button className='cancelButton' onClick={(e) => this.handleCancel(e)}>Cancel</button>
            <div className='signUpLink' onClick={this.handleSignUpLink}>Sign Up</div>
          </form>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.loginModal()
  }
}

const mapStateToProps = ({modals, user}) => {
  return {modals, user}
}

export default connect(mapStateToProps)(LoginModal)
