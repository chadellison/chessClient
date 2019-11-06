import React from 'react'
import '../styles/credentials.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'
import Logout from './Logout'

export const Credentials = ({user, handleModalAction}) => {
  if (user.token) {
    return <Logout />
  } else {
    return (
      <div className='row credentials justify-content-center'>
        <i className='glyphicon glyphicon-knight credentialIcon'
          onClick={() => handleModalAction({login: true})}
        />
        <div className='login' onClick={() => handleModalAction({login: true})}>
          Login
        </div>
        <div className='signUp' onClick={() => handleModalAction({signUp: true})}>
          Sign Up
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {user}
}

const mapDispatchToProps = {
  handleModalAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Credentials)
