import React from 'react'
import '../styles/moveLog.css'
import { Notation } from './Notation'

const findGameMoves = (handlePreviousBoard, game) => {
  const gameNotation = game.attributes.notation
  let gameMoves = []

  if (gameNotation) {
    const moves = gameNotation.slice(0, gameNotation.length - 1).split('.')
    gameMoves = moves.map((notation, index) => {
      return (
        <Notation
          index={index}
          onClick={handlePreviousBoard}
          notation={notation}/>
      );
    })
  }
  return gameMoves
}

export const MoveLog = ({handlePreviousBoard, game}) => {
  return (
    <div className='moveLog'>
    <div>
      <div className='col-xs-6 moveColumn'>
        White
      </div>
      <div className='col-xs-6 moveColumn'>
        Black
      </div>
      <hr className="lineBreak"/>
      {findGameMoves(handlePreviousBoard, game)}
      </div>
    </div>
  )
}

export default MoveLog;
