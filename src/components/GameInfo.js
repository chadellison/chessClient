import React, { Component } from 'react'
import '../styles/gameInfo.css'
import { connect } from 'react-redux'
import MoveLog from './MoveLog'
import Gear from './Gear'
import PlayerInfo from './PlayerInfo'
import { updateGamePayload } from '../actions/gameActions'
import { mapPiecesToBoard } from '../helpers/boardLogic'
import { fetchAnalyticsDataAction } from '../actions/analyticsActions'


class GameInfo extends Component {
  handlePreviousBoard = (e) => {
    let endIndex = parseInt(e.target.id, 10) + 1
    let previousSetup = this.props.game.attributes.moves.slice(0, endIndex)
    this.props.dispatch(updateGamePayload({previousSetup: previousSetup}))

    let gamePieces = Object.values(mapPiecesToBoard(previousSetup, this.props.game))
    if (this.props.analytics.active) {
      let gameTurnCode = previousSetup.length % 2 === 0 ? 'w' : 'b'
      this.props.dispatch(fetchAnalyticsDataAction(gamePieces, gameTurnCode, this.movesWithCount()))
    }
  }

  movesWithCount = () => {
    return this.props.game.attributes.moves.map((move, index) => {
      return { value: move, move_count: index + 1 }
    })
  }

  renderGear() {
    const {currentTurn, aiPlayer, outcome} = this.props.game.attributes
    if (currentTurn === aiPlayer.color && !outcome) {
      return <Gear/>
    } else {
      return ''
    }
  }

  findOpponentColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'blackPlayer' : 'whitePlayer'
  }

  findColor() {
    return this.props.game.attributes.whitePlayer.id === this.props.user.id ? 'whitePlayer' : 'blackPlayer'
  }

  renderPlayerInfo(color) {
    if (this.props.game.attributes.status) {
      const {active} = this.props.analytics
      return (
        <PlayerInfo playerColor={color} game={this.props.game} analyticsActive={active}/>
      )
    } else {
      return ''
    }
  }

  render() {
    return(
      <div className='gameInfo col-lg-3 col-md-12'>
        <div className='gameInfoBackground'>
          {this.renderGear()}
          {this.renderPlayerInfo(this.findOpponentColor())}
          <h3 className='moveLogTitle'>
            Move Log
          </h3>
          <MoveLog game={this.props.game}
            handlePreviousBoard={this.handlePreviousBoard}
          />
          <hr/>
          {this.renderPlayerInfo(this.findColor())}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({routing, user, game, sideBar, analytics}) => {
  return {routing, user, game, sideBar, analytics}
}

export default connect(mapStateToProps)(GameInfo)
