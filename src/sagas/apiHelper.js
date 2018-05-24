import {API_HOST} from "../config/endpoints.js"

const HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json'
}

export const fetchGames = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/v1/games`, {
      method: 'GET',
      headers: HEADERS
    })
    const data = await response.json()
    return data
  } catch(error) {
    return error
  }
}

export const login = async (action) => {
  let body = JSON.stringify({ credentials: action.credentials })
  const response = await fetch(`${API_HOST}/api/v1/authentication`, {
    method: 'POST',
    headers: HEADERS,
    body: body
  })
  const data = await response.json()
  return data
}

export const signUp = async (action) => {
  let body = JSON.stringify({ user: action.signUpInfo })
  const response = await fetch(`${API_HOST}/api/v1/users`, {
    method: 'POST',
    headers: HEADERS,
    body: body
  })
  const data = await response.json()
  return data
}
