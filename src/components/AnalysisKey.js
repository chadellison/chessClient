import React, { Component } from 'react'
import '../styles/analysisKey.css'

export default class AnalysisKey extends Component {
  winPercentage(color) {
    let whiteValue = parseInt(this.props.pieChartData[0].value, 10)
    let blackValue = parseInt(this.props.pieChartData[1].value, 10)
    let drawValue = parseInt(this.props.pieChartData[2].value, 10)
    let totalGames = whiteValue + blackValue + drawValue

    if (totalGames === 0) {
      return '0%'
    } else {
      if (color === 'white') {
        return `${Math.round((whiteValue / totalGames) * 100)}%`
      } else if (color === 'black') {
        return `${Math.round((blackValue / totalGames) * 100)}%`
      } else {
        return `${Math.round((drawValue / totalGames) * 100)}%`
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
