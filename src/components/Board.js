import React, { Component } from 'react'
import '../styles/board.css'
import Square from './Square'

export default class Board extends Component {
  // setOffset(index) {
  //   if(index % 8 === 0) {
  //     return ' col-xs-offset-2'
  //   } else {
  //     return ''
  //   }
  // }
  //
  // squareColor(id) {
  //   let sum = id.split('').reduce((value, character) => {
  //     if(LETTER_KEY[character]) {
  //       character = LETTER_KEY[character]
  //     }
  //     return value + parseInt(character, 10)
  //   }, 0)
  //
  //   return sum % 2 === 0 ? 'white' : 'black'
  // }


  renderBoard = () => {
    // return this.boardRows().map((row, rowIndex) => {
    //   let eachRow = row.map((square, columnIndex) => {
    //     return(
    //       <Square key={columnIndex}
    //         styles={`col-xs-1 square${this.setOffset(columnIndex)} ${this.squareColor(square)}`}
    //         id={square}
    //       />
    //     )
    //   })
    // return <div key={rowIndex} className="row">{eachRow}</div>
    // })
    <div>Board</div>
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12 board'>
        {this.renderBoard()}
      </div>
    )
  }
}
