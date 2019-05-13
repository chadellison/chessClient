import React, { Component } from 'react'
import '../styles/analysisKey.css'

export default class AnalysisKey extends Component {
  winPercentage(color) {
    let whiteWins = parseInt(this.props.pieChartData[0].value, 10)
    let blackWins = parseInt(this.props.pieChartData[1].value, 10)
    let draws = parseInt(this.props.pieChartData[2].value, 10)
    let totalGames = whiteWins + blackWins + draws

console.log('w', whiteWins)
console.log('b', blackWins)
console.log('d', draws)
console.log('t', totalGames)
    if (totalGames === 0) {
      return '0%'
    } else {
      if (color === 'white') {
        return `${Math.round((whiteWins / totalGames) * 100)}%`
      } else if (color === 'black') {
        return `${Math.round((blackWins / totalGames) * 100)}%`
      } else {
        return `${Math.round((draws / totalGames) * 100)}%`
      }
    }
  }

  render() {
    return(
      <div>
        <div className='analyticsKey'>
          <div className='whiteWinPercentage'>
          </div>
          <div className='blackWinPercentage'>
          </div>
          <div className='drawPercentage'>
          </div>
        </div>
        <div className='analyticsKey'>
          <div className='analyticsText'>{`White Wins: ${this.winPercentage('white')}`}</div>
          <div className='analyticsText'>{`Black Wins: ${this.winPercentage('black')}`}</div>
          <div className='analyticsText'>{`Draws: ${this.winPercentage('draw')}`}</div>
        </div>
      </div>
    )
  }
}
