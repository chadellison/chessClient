import React, { Component } from 'react'
import '../styles/board.css'
import Square from './Square'

export default class Board extends Component {
  renderBoard = () => {
    let rows = ['8', '7', '6', '5', '4', '3', '2', '1']
    let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return rows.map((row, rowIndex) => {
      let eachRow = columns.map((column, columnIndex) => {
        return (
          <Square key={`square${rowIndex + columnIndex + 1}`}
            id={column + row}
            value={rowIndex + columnIndex + 1}
          />
        )
      })
      return <div key={`row${rowIndex}`} className='boardRow row justify-content-center'>{eachRow}</div>
    })
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12 board'>
        {this.renderBoard()}
      </div>
    )
  }
}
