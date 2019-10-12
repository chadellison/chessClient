import React, { Component } from 'react'
import '../styles/promotePawnModal.css'
import { connect } from 'react-redux'
import moveAudio from '../audio/moveAudio.wav'
import { updateGamePayload, updateTurnAction } from '../actions/gameActions'
import { handleModalAction } from '../actions/modalActions'
import { nextTurn, updateBoard, updateAttributes } from '../helpers/boardLogic'
import { PromoteOption } from './PromoteOption'

class PromotePawnModal extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
  }

  handlePawnPromotion = (e) => {
    this.props.dispatch(handleModalAction({promotePawn: false}))
    this.handleMove(e.target.id)
  }

  handleMove(pieceType) {
    let updatedGame = JSON.parse(JSON.stringify(this.props.game))
    let updatedPieces = this.gamePiecesWithPromotedPawn(updatedGame, pieceType)
    updatedGame.pieces = updatedPieces

    let attributes = updateAttributes(updatedGame, this.props.game.selected.crossedPawnPosition, pieceType)
    this.props.dispatch(updateGamePayload({pieces: updateBoard(updatedGame, this.props.game.selected.crossedPawnPosition), attributes: attributes}))
    this.props.dispatch(updateTurnAction(nextTurn(this.props.game.attributes.currentTurn)))
    this.moveAudio.play()
    if (this.props.game.id) {
      let gameData = {
        game_id: this.props.game.id,
        position_index: this.props.game.selected.positionIndex,
        new_position: this.props.game.selected.crossedPawnPosition,
        upgraded_type: pieceType
      }
      this.props.sockets.gameSocket.update(gameData)
    }
  }

  gamePiecesWithPromotedPawn(game, pieceType) {
    return game.pieces.map((piece) => {
      if(piece.positionIndex === game.selected.positionIndex) {
        piece.pieceType = pieceType
      }
      return piece
    })
  }

  backgroundColor() {
    if (this.props.game.attributes.currentTurn === 'white') {
      return 'promoteWhitePawn'
    } else {
      return 'promoteBlackPawn'
    }
  }

  render() {
    let turn = this.props.game.attributes.currentTurn
    return (
      <div className='modalContainer' hidden={!this.props.modals.promotePawn}>
        <div className={`promotePawnModal ${this.backgroundColor()} col-sm-offset-4 col-md-4`}>
          <div className='row'>
            <PromoteOption id={'knight'} turn={turn} onClick={this.handlePawnPromotion} icon={'knight'}/>
            <PromoteOption id={'bishop'} turn={turn} onClick={this.handlePawnPromotion} icon={'bishop'}/>
            <PromoteOption id={'rook'} turn={turn} onClick={this.handlePawnPromotion} icon={'tower'}/>
            <PromoteOption id={'queen'} turn={turn} onClick={this.handlePawnPromotion} icon={'queen'}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({modals, game, sockets}) => {
  return {modals, game, sockets}
}

export default connect(mapStateToProps)(PromotePawnModal)
