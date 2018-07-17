import React, { Component } from 'react'
import '../styles/playerInfo.css'
import { findGravater } from '../helpers/boardLogic'

export default class PlayerInfo extends Component {
  playerName() {
    let game = this.props.game
    if (game.attributes[this.props.playerColor].name) {
      return game.attributes[this.props.playerColor].name
    } else {
      return game.attributes.aiPlayer.name
    }
  }

  renderPlayer() {
    let game = this.props.game
    if (game.attributes[this.props.playerColor].name || game.attributes.aiPlayer.name) {
      return(
        <div className='playerInfo row'>
          <img src={findGravater(game.attributes[this.props.playerColor], game)}
            className='playerGravatar' alt='gravatar'/>
          <div className='playerName'>{this.playerName()}</div>
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
