import React, { Component } from 'react'
import '../styles/playerInfo.css'

export default class PlayerInfo extends Component {
  findGravater(player) {
    if (player.id) {
      return `https://www.gravatar.com/avatar/${player.hashedEmail}`
    } else {
      return `https://robohash.org/${player.hashedEmail}`
    }
  }

  renderPlayer() {
    if (this.props.game.attributes[this.props.playerColor].name) {
      return(
        <div className='playerInfo row'>
          <img src={this.findGravater(this.props.game.attributes[this.props.playerColor])}
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
