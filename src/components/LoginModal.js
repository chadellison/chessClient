import React, { Component } from 'react'
import '../styles/loginModal.css'
import { connect } from 'react-redux'
import { handleModalAction, spinnerAction } from '../actions/modalActions'
import { loginAction, updateUserAction, signUpAction } from '../actions/userActions'
import Spinner from './Spinner'
import {LoginForm} from './LoginForm'
import {SignUpForm} from './SignUpForm'

class LoginModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(handleModalAction({login: false}))
    this.props.dispatch(updateUserAction({loginFailed: false, signUpFailed: false}))
  }

  handleCredentialCategory = (category) => {
    this.props.dispatch(handleModalAction({[category]: true}))
    this.props.dispatch(updateUserAction({loginFailed: false, signUpFailed: false}))
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

  handleSignUp = (e) => {
    e.preventDefault()
    let signUpInfo = {
      email: e.target.emailSignUpInput.value,
      password: e.target.passwordSignUpInput.value,
      first_name: e.target.firstNameSignUpInput.value,
      last_name: e.target.lastNameSignUpInput.value
    }
    this.props.dispatch(spinnerAction(true))
    this.props.dispatch(updateUserAction({signUpFailed: false}))
    this.props.dispatch(signUpAction(signUpInfo))
  }

  invalidCredentials(errorMessage) {
    if (this.props.user.loginFailed || this.props.user.signUpFailed) {
      return (
        <h3 className='invalidCredentialsText'>{errorMessage}</h3>
      )
    } else {
      return ''
    }
  }

  displaySpinner() {
    if (this.props.modals.spinnerActive) {
      return <Spinner />
    } else {
      return ''
    }
  }

  render() {
    return (
      <div className='modalContainer' hidden={!this.props.modals.login && !this.props.modals.signUp}>
        <div className="login-wrap loginModal">
        	<div className="login-html">
        		<input id="signInTab" type="radio" name="tab" className="sign-in" checked={this.props.modals.login}
              onChange={() => this.handleCredentialCategory('login')}
            />
            <label htmlFor="signInTab" className="tab">Sign In</label>
        		<input id="signUpTab" type="radio" name="tab" className="sign-up" checked={this.props.modals.signUp}
              onChange={() => this.handleCredentialCategory('signUp')}
            />
            <label htmlFor="signUpTab" className="tab">Sign Up</label>
        		<div className="login-form">
        			<LoginForm
                spinnerActive={this.props.modals.spinnerActive}
                handleLogin={this.handleLogin}
                loginFailed={this.props.user.loginFailed}
                handleCancel={this.handleCancel}
              />
              <SignUpForm
                spinnerActive={this.props.modals.spinnerActive}
                handleSignUp={this.handleSignUp}
                signUpFailed={this.props.user.signUpFailed}
              />
        		</div>
        	</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({modals, user}) => {
  return {modals, user}
}

export default connect(mapStateToProps)(LoginModal)
