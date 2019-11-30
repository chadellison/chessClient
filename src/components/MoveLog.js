import React from 'react'
import '../styles/moveLog.css'

const selectedMoveClass = (index, selectedMove) => {
  if (index + 1 === selectedMove) {
    return ' selectedMove'
  } else {
    return ''
  }
}

const renderMoves = (game, handlePreviousBoard, selectedMove) => {
  let gameNotation = game.attributes.notation
  let gameMoves = []

  if (gameNotation) {
    let moves = gameNotation.slice(0, gameNotation.length - 1).split('.')
    gameMoves = moves.map((notation, index) => {
      return(
        <div key={`${index}Notation`}
          className='col-xs-6'>
            <span className={`move${selectedMoveClass(index, selectedMove)}`}
              onClick={() => handlePreviousBoard(index)} id={index}>
              {`${index + 1}. ${notation}`}
            </span>
        </div>
      )
    })
  }
  return (
    <div>
      <div className='col-xs-6 moveColumn'>White</div>
      <div className='col-xs-6 moveColumn'>Black</div>
      {gameMoves}
    </div>
  )
}

export const MoveLog = ({game, handlePreviousBoard, selectedMove}) => {
  return (
    <div className='moveLog'>
      {renderMoves(game, handlePreviousBoard, selectedMove)}
    </div>
  )
}
