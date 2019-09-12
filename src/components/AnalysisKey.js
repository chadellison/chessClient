import React from 'react'
import '../styles/analysisKey.css'

const AnalysisKey = ({pieChartData}) => {
  const whiteValue = parseInt(pieChartData[0].value * 100, 10)
  const blackValue = parseInt(pieChartData[1].value * 100, 10)
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
        <div className='analyticsText'>{`White Wins: ${whiteValue} %`}</div>
        <div className='analyticsText'>{`Black Wins: ${blackValue} %`}</div>
      </div>
    </div>
  )
}
export default AnalysisKey
