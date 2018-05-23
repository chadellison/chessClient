import React, { Component } from 'react'
import spinner from '../images/spinner.svg';
import '../styles/spinner.css'

export default class Spinner extends Component {
  render() {
    return <img className='spinner' src={spinner} alt='spinner'></img>
  }
}
