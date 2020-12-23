import React, { Component } from 'react'
import '../styles/analytics.css'
import AnalysisKey from './AnalysisKey'
import PieChart from 'react-simple-pie-chart'

export default class Analytics extends Component {
  componentDidUpdate(oldProps) {
    if (oldProps.notation !== this.props.notation) {
      this.props.handleFetchAnalytics()
    }
  }

  render() {
    return (
      <div>
        <div className='chart'>
          <PieChart slices={this.props.pieChartData} />
        </div>
        <AnalysisKey pieChartData={this.props.pieChartData}/>
      </div>
    )
  }
}
