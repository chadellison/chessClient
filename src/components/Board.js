import React, { Component } from 'react'
import '../styles/board.css'
import Square from './Square'

export default class Board extends Component {
  renderBoard = () => {
    let rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let columns = ['8', '7', '6', '5', '4', '3', '2', '1']

    return rows.map((row, rowIndex) => {
      let eachRow = columns.map((column, columnIndex) => {
        return (
          <Square key={`square${rowIndex + columnIndex + 1}`}
            id={row + column}
            value={rowIndex + columnIndex + 1}
          />
        )
      })
      return <div key={`row${rowIndex}`} className='boardRow row'>{eachRow}</div>
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
