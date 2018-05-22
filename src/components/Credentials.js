import React, { Component } from 'react'
import '../styles/credentials.css'

export default class Credentials extends Component {
  render() {
    return(
      <div className='row credentials justify-content-center'>
        <i className='glyphicon glyphicon-user credentialIcon'/>
        <div className='login'>Login</div>
        <div className='signUp'>Sign Up</div>
      </div>
    )
  }
}
