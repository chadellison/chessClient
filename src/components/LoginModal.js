import React, { Component } from 'react'
import '../styles/loginModal.css'
import { connect } from 'react-redux'
import { handleModalAction, spinnerAction } from '../actions/modalActions'
import { loginAction, updateUserAction } from '../actions/userActions'
import Spinner from './Spinner'

class LoginModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(handleModalAction({login: false}))
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
    this.props.dispatch(handleModalAction({signUp: true, login: false}))
  }

  invalidCredentials() {
    if(this.props.user.loginFailed) {
      return (
        <h3 className='invalidCredentialsText'>Incorrect email or password</h3>
      )
    } else {
      return ''
    }
  }

  render() {
    return (
      <div className='modalContainer' hidden={!this.props.modals.login}>
        <form className='loginModal col-sm-offset-5 col-md-2' onSubmit={(e) => this.handleLogin(e)}>
          <Spinner hidden={!this.props.modals.spinnerActive} />
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
          <div className='modalPadding'></div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({modals, user}) => {
  return {modals, user}
}

export default connect(mapStateToProps)(LoginModal)
