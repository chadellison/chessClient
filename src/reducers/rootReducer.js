import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import chatReducer from './chatReducer'
import gameReducer from './gameReducer'
import activeGamesReducer from './activeGamesReducer'
import modalReducer from './modalReducer'
import userReducer from './userReducer'

export default combineReducers({
  routing: routerReducer,
  chat: chatReducer,
  game: gameReducer,
  activeGames: activeGamesReducer,
  modals: modalReducer,
  user: userReducer,
})
