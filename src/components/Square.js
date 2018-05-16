import React, { Component } from 'react'
import '../styles/square.css'

export default class Square extends Component {
  findColor() {
    return this.props.value % 2 === 0 ? 'white' : 'black'
  }

  render() {
    return <div className={`square ${this.findColor()}`}></div>
  }
}
