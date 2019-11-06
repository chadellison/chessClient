import React from 'react'
import '../styles/playerInfo.css'
import { findGravater } from '../helpers/boardLogic'

const playerName = (game, playerColor) => {
  if (game.attributes[playerColor].name) {
    return game.attributes[playerColor].name
  } else {
    return game.attributes.aiPlayer.name
  }
}
const PlayerInfo = ({game, playerColor}) => {
  return(
    <div className="playerInfo">
      <img src={findGravater(game.attributes[playerColor], game)}
        className='playerGravatar' alt='gravatar'/>
      <div className='playerName'>{playerName(game, playerColor)}</div>
    </div>
  )
}

export default PlayerInfo;
