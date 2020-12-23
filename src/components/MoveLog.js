import React from 'react'
import '../styles/moveLog.css'

const selectedMoveClass = (index, selectedMove) => {
  if (index === selectedMove) {
    return ' selectedMove'
  } else {
    return ''
  }
}

const renderMoves = (game, handlePreviousBoard, selectedMove) => {
  const gameNotation = game.previousSetup ? game.previousSetup : game.notation;
  let gameMoves = []

  if (gameNotation) {
    const splitMoves = gameNotation.split(' ');

    gameMoves = splitMoves.slice(0, splitMoves.length - 1).map((notation, index) => {
      return(
        <div key={`${index}Notation`}
          className='col-xs-6'>
            <span className={`move${index === selectedMove ? ' selectedMove' : ''}`}
              onClick={() => handlePreviousBoard(index)} id={index}>
              {`${index + 1}. ${notation}`}
            </span>
        </div>
      )
    })
  }

  return (
    <div className="moves">
      <div className='col-xs-6 moveColumn'>White</div>
      <div className='col-xs-6 moveColumn'>Black</div>
      {gameMoves}
    </div>
  )
}

export const MoveLog = ({game, handlePreviousBoard, selectedMove}) => {
  return (
    <div className='moveLog'>
      <h3 className='moveLogTitle'>
        Move Log
      </h3>
      {renderMoves(game, handlePreviousBoard, selectedMove)}
    </div>
  )
}
