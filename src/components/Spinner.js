import React from 'react'
import spinner from '../images/spinner.svg';
import '../styles/spinner.css'

export const Spinner = ({hidden}) => {
  return (
    <img className='spinner'
      src={spinner} alt='spinner' hidden={hidden}>
    </img>
  )
}

export default Spinner
