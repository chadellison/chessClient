import React, { Component } from 'react'
import '../styles/gear.css'

export default class Gear extends Component {
  render() {
    return (
      <div className='gear'>
        <div className="loader">
          <i className="cog cog-lg glyphicon glyphicon-cog"></i>
          <i className="cog cog-counter cog-md glyphicon glyphicon-cog"></i>
          <i className="cog cog-sm glyphicon glyphicon-cog"></i>
        </div>
      </div>
    )
  }
}
