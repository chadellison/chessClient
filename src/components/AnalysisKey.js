import React from 'react'
import '../styles/analysisKey.css'

const winPercentage = (chartDataValue, totalGames) => {
  if (totalGames === 0) {
    return '0%'
  } else {
    return `${Math.round((parseInt(chartDataValue, 10) / totalGames) * 100)}%`
  }
}

const AnalysisKey = ({pieChartData}) => {
  const whiteValue = parseInt(pieChartData[0].value, 10)
  const blackValue = parseInt(pieChartData[1].value, 10)
  const drawValue = parseInt(pieChartData[2].value, 10)
  const totalGames = whiteValue + blackValue + drawValue
  return (
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
        <div className='analyticsText'>{`White Wins: ${winPercentage(whiteValue, totalGames)}`}</div>
        <div className='analyticsText'>{`Black Wins: ${winPercentage(whiteValue, totalGames)}`}</div>
        <div className='analyticsText'>{`Draws: ${winPercentage(whiteValue, totalGames)}`}</div>
      </div>
    </div>
  )
}
export default AnalysisKey
