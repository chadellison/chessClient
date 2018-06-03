import React, { Component } from 'react'
import '../styles/analytics.css'
import AnalysisKey from './AnalysisKey'
import PieChart from 'react-simple-pie-chart'

export default class Analytics extends Component {
  render() {
    return(
      <div>
        <div className='chart'>
          <PieChart slices={this.props.chartData} />
        </div>
        <AnalysisKey chartData={this.props.chartData}/>
      </div>
    )
  }
}
