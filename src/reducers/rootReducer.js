import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import chatReducer from './chatReducer'
import gameReducer from './gameReducer'

export default combineReducers({
  routing: routerReducer,
  chat: chatReducer,
  game: gameReducer
})
