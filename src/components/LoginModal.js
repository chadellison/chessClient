import React, { Component } from 'react'
import '../styles/loginModal.css'
import { connect } from 'react-redux'
import {loginModalAction} from '../actions/modalActions'

class LoginModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(loginModalAction(false))
  }

  handleLogin = (e) => {
    e.preventDefault()
    console.log(e, 'login')
  }

  handleSignUpLink = () => {
    console.log('login')
  }

  loginModal = () => {
    if(this.props.modals.loginModalActive) {
      return (
        <div className='modalContainer'>
          <form className='loginModal col-sm-offset-5 col-md-2' onSubmit={(e) => this.handleLogin(e)}>
            <h4 className='emailTitle'>Email</h4>
            <input className='emailInput'></input>
            <h4 className='passwordTitle'>Password</h4>
            <input className='passwordInput' type='password'/>
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

const mapStateToProps = ({modals}) => {
  return {modals}
}

export default connect(mapStateToProps)(LoginModal)
