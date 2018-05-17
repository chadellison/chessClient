import React, { Component } from 'react'
import '../styles/square.css'
import Piece from './Piece'

export default class Square extends Component {
  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  renderPiece() {
    return this.props.piece ? <Piece piece={this.props.piece} /> : ''
  }

  render() {
    return (
      <div className={`square ${this.findColor()}`} id={this.props.id}>
        {this.renderPiece()}
      </div>
    )
  }
}
