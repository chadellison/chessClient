import React from 'react'
import Spinner from './Spinner'

export const SignUpForm = ({
  spinnerActive,
  handleSignUp,
  signUpFailed
}) => {

  return (
    <form className="sign-up-htm" onSubmit={(e) => handleSignUp(e)}>
      {spinnerActive ? <Spinner /> : ''}
      {signUpFailed ?<h3 className='invalidCredentialsText'>{'Submission failed, please try again'}</h3> : ''}
      <div className="group">
        <label htmlFor="emailSignUpInput" className="label">Email</label>
        <input id="emailSignUpInput" type="text" className="input"/>
      </div>
      <div className="group">
        <label htmlFor="passwordSignUpInput" className="label">Password</label>
        <input id="passwordSignUpInput" type="password" className="input" data-type="password"/>
      </div>
      <div className="group">
        <label htmlFor="firstNameSignUpInput" className="label">First Name</label>
        <input id="firstNameSignUpInput" type="text" className="input" data-type="text"/>
      </div>
      <div className="group">
        <label htmlFor="lastNameSignUpInput" className="label">Last Name</label>
        <input id="lastNameSignUpInput" type="text" className="input"/>
      </div>
      <div className="group">
        <input type="submit" className="button" value="Sign Up"/>
      </div>
      <div className="hr"></div>
      <div className="foot-lnk">
        <label htmlFor="tab-1">Already Member?</label>
      </div>
    </form>
  );
}
