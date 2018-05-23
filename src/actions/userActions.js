export const loginAction = (credentials) => {
  return {
    type: 'LOGIN',
    credentials: credentials
  }
}

export const logoutAction = () => {
  return {
    type: 'LOGOUT'
  }
}

export const successfulLoginAction = (userData) => {
  return {
    type: 'SUCCESSFUL_LOGIN',
    userData: userData
  }
}

export const failedLoginAction = () => {
  return {
    type: 'FAILED_LOGIN',
    userData: { loginFailed: true }
  }
}

export const updateUserAction = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload: payload
  }
}
