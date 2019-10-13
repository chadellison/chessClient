import React from 'react'
import '../styles/gameInfo.css'
import { connect } from 'react-redux'
import MoveLog from './MoveLog'
import Gear from './Gear'
import PlayerInfo from './PlayerInfo'

const findOpponentColor = (whitePlayerId, userId) => {
  return whitePlayerId === userId ? 'blackPlayer' : 'whitePlayer'
}
const findColor = (whitePlayerId, userId) => {
  return whitePlayerId === userId ? 'whitePlayer' : 'blackPlayer'
}

const renderPlayerInfo = (color, status, active, game) => {
  return status ? <PlayerInfo playerColor={color} game={game} analyticsActive={active}/> : ''
}

const GameInfo = ({routing, user, game, analytics}) => {
  const {pathname} = routing.location;
  const {currentTurn, aiPlayer, outcome, whitePlayer, status} = game.attributes
  return (
    <div hidden={pathname === '/games' || pathname === '/allGames'} className='gameInfo col-lg-3 col-md-12'>
      <div className='gameInfoBackground'>
        <Gear hidden={currentTurn !== aiPlayer.color || outcome}/>
        {renderPlayerInfo(findOpponentColor(whitePlayer.id, user.id), status, analytics.active, game)}
        <h3 className='moveLogTitle'>
          Move Log
        </h3>
        <MoveLog game={game} />
        <hr/>
        {renderPlayerInfo(findColor(whitePlayer.id, user.id), status, analytics.active, game)}
      </div>
    </div>
  )
}

const mapStateToProps = ({routing, user, game, analytics}) => {
  return {routing, user, game, analytics}
}

export default connect(mapStateToProps)(GameInfo)
