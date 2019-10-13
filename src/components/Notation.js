import React from 'react'
import { updateGamePayload } from '../actions/gameActions'
import { mapPiecesToBoard } from '../helpers/boardLogic'
import { fetchAnalyticsDataAction } from '../actions/analyticsActions'
import { connect } from 'react-redux'

const movesWithCount = (moves) => {
  return moves.map((move, index) => ({ value: move, move_count: index + 1 }))
}

const handlePreviousBoard = (e, updateGamePayload, fetchAnalyticsDataAction, game, analytics) => {
  let endIndex = parseInt(e.target.id, 10) + 1
  let previousSetup = game.attributes.moves.slice(0, endIndex)
  updateGamePayload({previousSetup: previousSetup})

  let gamePieces = Object.values(mapPiecesToBoard(previousSetup, game))
  if (analytics.active) {
    let gameTurnCode = previousSetup.length % 2 === 0 ? 'w' : 'b'
    fetchAnalyticsDataAction(gamePieces, gameTurnCode, movesWithCount(game.attributes.moves))
  }
}

const Notation = ({index, notation, game, analytics, updateGamePayload, fetchAnalyticsDataAction}) => {
  return (
    <div
      id={index}
      onClick={(e) => handlePreviousBoard(e, updateGamePayload, fetchAnalyticsDataAction, game, analytics)}
      className='col-xs-6 move'>
      {`${index + 1}. ${notation}`}
    </div>
  )
}
const mapDispatchToProps = {
  updateGamePayload,
  fetchAnalyticsDataAction,
}

const mapStateToProps = ({game, analytics}) => {
  return {game, analytics}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notation)
