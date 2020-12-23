import React from 'react'
import Spinner from './Spinner'

export const LoginForm = ({spinnerActive, handleLogin, loginFailed, handleCancel}) => {
  return (
    <form className="sign-in-htm" onSubmit={(e) => handleLogin(e)}>
      {spinnerActive ? <Spinner /> : ''}
      {loginFailed ?<h3 className='invalidCredentialsText'>{'Incorrect email or password'}</h3> : ''}
      <div className="group">
        <label htmlFor="emailInput" className="label">Email</label>
        <input id="emailInput" type="text" className="input"/>
      </div>
      <div className="group">
        <label htmlFor="passwordInput" className="label">Password</label>
        <input id="passwordInput" type="password" className="input" data-type="password"/>
      </div>
      <div className="group">
        <input type="submit" className="button" value="Sign In"/>
      </div>
      <div className="hr"></div>
      <div className="foot-lnk">
        <a href="" onClick={(e) => handleCancel(e)}>Cancel</a>
      </div>
    </form>
  );
}
