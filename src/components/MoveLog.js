import React, { Component } from 'react'
import '../styles/moveLog.css'

export default class MoveLog extends Component {
  handlePreviousBoard = () => {
    console.log('previous board')
  }

  moves() {
    let gameNotation = this.props.game.attributes.notation
    let gameMoves = []

    if (gameNotation) {
      let moves = gameNotation.split('.')
      moves.pop()
      gameMoves = moves.map((notation, index) => {
        return(
          <div key={`${index}Notation`} id={index}
            onClick={this.handlePreviousBoard}
            className='col-xs-6 move'>
              {`${index + 1}. ${notation}`}
          </div>
        )
      })
    }
    return (
      <div className='row moveLog'>
        <div className='col-xs-6 moveColumn'>White</div>
        <div className='col-xs-6 moveColumn'>Black</div>
        <hr className='lineBreak'></hr>
        {gameMoves}
      </div>
    )
  }

  render() {
    return (
      <div className='moveLog'>
        {this.moves()}
      </div>
    )
  }
}
