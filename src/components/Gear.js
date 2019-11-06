import React from 'react'
import '../styles/gear.css'

export const Gear = ({hidden}) => {
  return (
    <div hidden={hidden} className='gear'>
      <div className="loader">
        <i className="cog cog-lg glyphicon glyphicon-cog"></i>
        <i className="cog cog-counter cog-md glyphicon glyphicon-cog"></i>
        <i className="cog cog-sm glyphicon glyphicon-cog"></i>
      </div>
    </div>
  )
}

export default Gear
