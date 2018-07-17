import React, { Component } from 'react'
import '../styles/promotePawnModal.css'
import { connect } from 'react-redux'
import moveAudio from '../audio/moveAudio.wav'
import { updateGamePayload, updateTurnAction } from '../actions/gameActions'
import { handleModalAction } from '../actions/modalActions'
import { nextTurn, updateBoard, updateAttributes } from '../helpers/boardLogic'

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

    if(this.props.game.id) {
      let gameData = {
        game_id: this.props.game.id,
        position_index: this.props.game.selected.positionIndex,
        new_position: this.props.game.selected.crossedPawnPosition,
        upgraded_type: pieceType
      }
      this.props.sockets.gameSocket.update(gameData)
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

  backgroundColor() {
    if (this.props.game.attributes.currentTurn === 'white') {
      return 'promoteWhitePawn'
    } else {
      return 'promoteBlackPawn'
    }
  }

  promotePawnModal = () => {
    if(this.props.modals.promotePawn) {
      return (
        <div className='modalContainer'>
          <div className={`promotePawnModal ${this.backgroundColor()} col-sm-offset-4 col-md-4`}>
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

const mapStateToProps = ({modals, game, sockets}) => {
  return {modals, game, sockets}
}

export default connect(mapStateToProps)(PromotePawnModal)
