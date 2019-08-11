import React, { Component } from 'react'
import '../styles/moveLog.css'

export default class MoveLog extends Component {
  renderMoves() {
    let gameNotation = this.props.game.attributes.notation
    let gameMoves = []

    if (gameNotation) {
      let moves = gameNotation.slice(0, gameNotation.length - 1).split('.')
      gameMoves = moves.map((notation, index) => {
        return(
          <div key={`${index}Notation`} id={index}
            onClick={this.props.handlePreviousBoard}
            className='col-xs-6 move'>
              {`${index + 1}. ${notation}`}
          </div>
        )
      })
    }
    return (
      <div>
        <div className='col-xs-6 moveColumn'>White</div>
        <div className='col-xs-6 moveColumn'>Black</div>
        <hr className="lineBreak"/>
        {gameMoves}
      </div>
    )
  }

  render() {
    return (
      <div className='moveLog'>
        {this.renderMoves()}
      </div>
    )
  }
}
