import React, { Component } from 'react'
import '../styles/promotePawnModal.css'
import { connect } from 'react-redux'
import moveAudio from '../audio/moveAudio.wav'
import {updateGamePayload, updateTurnAction} from '../actions/gameActions'
import {promotePawnModalAction} from '../actions/modalActions'
import { nextTurn, updateBoard } from '../helpers/boardLogic'

class PromotePawnModal extends Component {
  constructor() {
    super()
    this.moveAudio = new Audio(moveAudio)
  }

  handlePawnPromotion = (e) => {
    this.props.dispatch(promotePawnModalAction(false))
    this.handleMove(e.target.id)
  }

  handleMove(pieceType) {
    let updatedGame = JSON.parse(JSON.stringify(this.props.game))
    let updatedPieces = this.gamePiecesWithPromotedPawn(updatedGame, pieceType)
    updatedGame.pieces = updatedPieces

    this.props.dispatch(updateGamePayload({pieces: updateBoard(updatedGame, this.props.game.selected.crossedPawnPosition)}))
    this.props.dispatch(updateTurnAction(nextTurn(this.props.game.attributes.currentTurn)))

    if(this.props.game.id) {
      let gameData = {
        game_id: this.props.game.id,
        position_index: this.props.game.selected.positionIndex,
        new_position: this.props.id,
        upgraded_type: pieceType
      }
      this.props.sendMoveToServer(gameData)
    } else {
      this.moveAudio.play()
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

  promotePawnModal = () => {
    if(this.props.modals.promotePawnModalActive) {
      return (
        <div className='modalContainer'>
          <div className='promotePawnModal col-sm-offset-4 col-md-4'>
            <div className='row'>
              <i
                id={'knight'}
                className={
                  `glyphicon glyphicon-knight
                    promotePawn piece-${this.props.game.attributes.currentTurn}`
                }
                onClick={(e) => this.handlePawnPromotion(e)}
              />
              <i
                id={'bishop'}
                className={
                  `glyphicon glyphicon-bishop
                    promotePawn piece-${this.props.game.attributes.currentTurn}`
                }
                onClick={(e) => this.handlePawnPromotion(e)}
              />
              <i
                id={'rook'}
                className={
                  `glyphicon glyphicon-tower
                    promotePawn piece-${this.props.game.attributes.currentTurn}`
                }
                onClick={(e) => this.handlePawnPromotion(e)}
              />
              <i
                id={'queen'}
                className={
                  `glyphicon glyphicon-queen
                    promotePawn piece-${this.props.game.attributes.currentTurn}`
                }
                onClick={(e) => this.handlePawnPromotion(e)}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return this.promotePawnModal()
  }
}

const mapStateToProps = ({modals, game}) => {
  return {modals, game}
}

export default connect(mapStateToProps)(PromotePawnModal)
