import { BOARD } from '../constants/board'

const boardReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
      return action.board;
    case 'RESET_BOARD':
      return BOARD;
    default:
      return state;
  }
}

export default boardReducer
