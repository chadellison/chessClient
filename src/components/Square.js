import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'
import { DropTarget } from 'react-drag-drop-container'

export default class Square extends Component {
  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  renderPiece() {
    return this.props.piece ? <Piece piece={this.props.piece} /> : ''
  }

  handleMove() {
    console.log('bingo')
    return true
  }

  render() {
    return (
      <DropTarget targetKey='dropSquare' dropData={{id: this.props.id}} onHit={this.handleMove}>
        <div className={`square ${this.findColor()}`} id={this.props.id}>
          {this.renderPiece()}
        </div>
      </DropTarget>
    )
  }
}
