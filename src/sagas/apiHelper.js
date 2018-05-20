import {API_HOST} from "../config/endpoints.js"

const HEADERS = {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}

export const fetchGames = async () => {
  const response = await fetch(`${API_HOST}/`, {
    method: 'GET',
    headers: HEADERS
  })
  const data = await response.json()
  return data
}
