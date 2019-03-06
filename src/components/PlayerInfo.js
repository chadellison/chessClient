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

  playerInfoStyle = () => {
    const height = this.props.analyticsActive ? '4vw' : '14vw'
    return {
      marginTop: '6rem',
      height: height,
      transition: 'all 1s',
    }
  }

  render() {
    let game = this.props.game
    return(
      <div style={this.playerInfoStyle()}>
        <img src={findGravater(game.attributes[this.props.playerColor], game)}
          className='playerGravatar' alt='gravatar'/>
        <div className='playerName'>{this.playerName()}</div>
      </div>
    )
  }
}
