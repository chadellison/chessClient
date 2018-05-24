export const loginAction = (credentials) => {
  return {
    type: 'LOGIN',
    credentials: credentials
  }
}

export const signUpAction = (signUpInfo) => {
  return {
    type: 'SIGN_UP',
    signUpInfo: signUpInfo
  }
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT'
  }
}

export const failedLoginAction = () => {
  return {
    type: 'UPDATE_USER_FIELD',
    userData: { loginFailed: true }
  }
}

export const failedSignUpAction = () => {
  return {
    type: 'UPDATE_USER_FIELD',
    userData: { signUpFailed: true }
  }
}

export const updateUserAction = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload: payload
  }
}
