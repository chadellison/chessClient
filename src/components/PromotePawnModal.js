import React, { Component } from 'react'
import '../styles/promotePawnModal.css'
import { connect } from 'react-redux'
import moveAudio from '../audio/moveAudio.wav'
import { updateGameAction } from '../actions/gameActions'
import { handleModalAction } from '../actions/modalActions'
import { nextTurn, updateBoard, updateAttributes } from '../helpers/boardLogic'
import { createNotation, sendMoveToServer } from '../helpers/gameLogic'

const handlePawnPromotion = (pieceType, game, board, handleModalAction, updateGameAction, sockets) => {
  const {id, notation, selected, promotedPawn} = game;
  const pieces = Object.values(board)

  const newNotation = createNotation(pieces, selected, promotedPawn.position, pieceType)
  handleModalAction({promotePawn: false});
  updateGameAction({...game, promotedPawn: {}})
  sockets.gameSocket.update({game_id: id, notation: game.notation + newNotation})
}

const PromotePawnModal = ({game, sockets, board, handleModalAction, updateGameAction}) => {
  const turn = game.selected.color === 'w' ? 'white' : 'black';
  const backgroundColor = turn === 'white' ? 'promoteWhitePawn' : 'promoteBlackPawn';
  return (
    <div className='modalContainer'>
      <div className={`promotePawnModal ${backgroundColor} col-sm-offset-4 col-md-4`}>
        <div className='row'>
          <i
            id={'knight'}
            className={
              `glyphicon glyphicon-knight
                promotePawn piece-${turn}`
            }
            onClick={() => handlePawnPromotion('N', game, board, handleModalAction, updateGameAction, sockets)}
          />
          <i
            id={'bishop'}
            className={
              `glyphicon glyphicon-bishop
                promotePawn piece-${turn}`
            }
            onClick={() => handlePawnPromotion('B', game, board, handleModalAction, updateGameAction, sockets)}
          />
          <i
            id={'rook'}
            className={
              `glyphicon glyphicon-tower
                promotePawn piece-${turn}`
            }
            onClick={() => handlePawnPromotion('R', game, board, handleModalAction, updateGameAction, sockets)}
          />
          <i
            id={'queen'}
            className={
              `glyphicon glyphicon-queen
                promotePawn piece-${turn}`
            }
            onClick={() => handlePawnPromotion('Q', game, board, handleModalAction, updateGameAction, sockets)}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({game, sockets, board}) => {
  return {game, sockets, board}
}

const mapDispatchToProps = {
  handleModalAction,
  updateGameAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotePawnModal)
