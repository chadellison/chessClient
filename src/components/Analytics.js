import React, { Component } from 'react'
import '../styles/analytics.css'
import AnalysisKey from './AnalysisKey'
import PieChart from 'react-simple-pie-chart'

export default class Analytics extends Component {
  componentWillUpdate(newProps) {
    if (this.props.notation !== newProps.notation) {
      this.props.handleFetchAnalytics()
    }
  }

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
