import React, { Component } from 'react'
import '../styles/playerInfo.css'
import {findGravater} from '../helpers/boardLogic'

export default class PlayerInfo extends Component {
  renderPlayer() {
    if (this.props.game.attributes[this.props.playerColor].name) {
      return(
        <div className='playerInfo row'>
          <img src={findGravater(this.props.game.attributes[this.props.playerColor])}
            className='playerGravatar' alt='gravatar'/>
          <div className='playerName'>{this.props.game.attributes[this.props.playerColor].name}</div>
        </div>
      )
    } else {
      return <div className='playerInfo'></div>
    }
  }
  render() {
    return this.renderPlayer()
  }
}
