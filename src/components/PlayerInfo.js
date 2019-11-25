import React, { Component } from 'react'
import '../styles/playerInfo.css'
import { findGravater } from '../helpers/boardLogic'

export default class PlayerInfo extends Component {
  playerName() {
    let game = this.props.game
    if (game.id) {
      if (game.attributes[this.props.playerColor].name) {
        return game.attributes[this.props.playerColor].name
      } else {
        return game.attributes.aiPlayer.name
      }
    } else {
      return ''
    }
  }

  render() {
    let game = this.props.game
    return(
      <div className="playerInfo">
        <img src={game.attributes[this.props.playerColor] ? findGravater(game.attributes[this.props.playerColor], game) : ''}
          className='playerGravatar' alt='gravatar'/>
        <div className='playerName'>{this.playerName()}</div>
      </div>
    )
  }
}
