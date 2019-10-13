import React from 'react'
import '../styles/analysisKey.css'

const AnalysisKey = ({pieChartData}) => {
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
        <div className='analyticsText'>{`White Wins: ${pieChartData[0].value} %`}</div>
        <div className='analyticsText'>{`Black Wins: ${pieChartData[1].value} %`}</div>
        <div className='analyticsText'>{`Draws: ${pieChartData[2].value} %`}</div>
      </div>
    </div>
  )
}
export default AnalysisKey
