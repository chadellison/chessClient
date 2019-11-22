import React, { Component } from 'react'
import '../styles/loginModal.css'
import { connect } from 'react-redux'
import { handleModalAction, spinnerAction } from '../actions/modalActions'
import { loginAction, updateUserAction, signUpAction } from '../actions/userActions'
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
    if(this.props.modals.spinnerActive) {
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
        		<input id="tab-1" type="radio" name="tab" className="sign-in" checked={this.props.modals.login}
              onChange={() => this.props.dispatch(handleModalAction({login: true}))}
            />
            <label for="tab-1" className="tab">Sign In</label>
        		<input id="tab-2" type="radio" name="tab" className="sign-up" checked={this.props.modals.signUp}
              onChange={() => this.props.dispatch(handleModalAction({signUp: true}))}
            />
            <label for="tab-2" className="tab">Sign Up</label>
        		<div className="login-form">
        			<form className="sign-in-htm" onSubmit={(e) => this.handleLogin(e)}>
                {this.displaySpinner()}
                {this.invalidCredentials('Incorrect email or password')}
        				<div className="group">
        					<label for="email" className="label">Email</label>
        					<input id="emailInput" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<label for="passwordInput" className="label">Password</label>
        					<input id="passwordInput" type="password" className="input" data-type="password"/>
        				</div>
        				<div className="group">
        					<input id="check" type="checkbox" className="check" checked/>
        					<label for="check"><span className="icon"></span> Keep me Signed in</label>
        				</div>
        				<div className="group">
        					<input type="submit" className="button" value="Sign In"/>
        				</div>
        				<div className="hr"></div>
        				<div className="foot-lnk">
                  <a href="" onClick={(e) => this.handleCancel(e)}>Cancel</a>
        				</div>
        			</form>
        			<form className="sign-up-htm" onSubmit={(e) => this.handleSignUp(e)}>
                {this.displaySpinner()}
                {this.invalidCredentials('Submission failed, please try again')}
        				<div className="group">
        					<label for="emailSignUpInput" className="label">Email</label>
        					<input id="emailSignUpInput" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<label for="passwordSignUpInput" className="label">Password</label>
        					<input id="passwordSignUpInput" type="password" className="input" data-type="password"/>
        				</div>
        				<div className="group">
        					<label for="firstNameSignUpInput" className="label">First Name</label>
        					<input id="firstNameSignUpInput" type="text" className="input" data-type="text"/>
        				</div>
        				<div className="group">
        					<label for="lastNameSignUpInput" className="label">Last Name</label>
        					<input id="lastNameSignUpInput" type="text" className="input"/>
        				</div>
        				<div className="group">
        					<input type="submit" className="button" value="Sign Up"/>
        				</div>
        				<div className="hr"></div>
        				<div className="foot-lnk">
        					<label for="tab-1">Already Member?</label>
        				</div>
        			</form>
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
