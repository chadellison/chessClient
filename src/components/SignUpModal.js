import React, { Component } from 'react'
import '../styles/signUpModal.css'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import {handleModalAction, spinnerAction} from '../actions/modalActions'
import {signUpAction, updateUserAction} from '../actions/userActions'

class SignUpModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(handleModalAction({signUp: false}))
    this.props.dispatch(updateUserAction({signUpFailed: false}))
  }

  handleSignUp = (e) => {
    e.preventDefault()
    let signUpInfo = {
      email: e.target.emailInput.value,
      password: e.target.passwordInput.value,
      first_name: e.target.firstNameInput.value,
      last_name: e.target.lastNameInput.value
    }
    this.props.dispatch(spinnerAction(true))
    this.props.dispatch(updateUserAction({signUpFailed: false}))
    this.props.dispatch(signUpAction(signUpInfo))
  }

  invalidSignUp() {
    if(this.props.user.signUpFailed) {
      return (
        <h3 className='invalidCredentialsText'>
          Submission failed, please try again
        </h3>
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

  signUpModal = () => {
    if(this.props.modals.signUp) {
      return (
        <div className='modalContainer'>
          <form className='signUpModal col-sm-offset-5 col-md-2' onSubmit={(e) => this.handleSignUp(e)}>
            {this.displaySpinner()}
            {this.invalidSignUp()}
            <h4 className='emailTitle'>Email</h4>
            <input className='emailInput' id='emailInput'></input>
            <h4 className='passwordTitle'>Password</h4>
            <input className='passwordInput' id='passwordInput' type='password'/>
            <br/>
            <h4 className='firstNameTitle'>First Name</h4>
            <input className='firstNameInput' id='firstNameInput'></input>
            <h4 className='lastNameTitle'>Last Name</h4>
            <input className='lastNameInput' id='lastNameInput'/>
            <br/>
            <input type='submit' className='submitSignUp'/>
            <br/>
            <button className='cancelButton' onClick={(e) => this.handleCancel(e)}>Cancel</button>
            <div className='modalPadding'></div>
          </form>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.signUpModal()
  }
}

const mapStateToProps = ({modals, user}) => {
  return {modals, user}
}

export default connect(mapStateToProps)(SignUpModal)
