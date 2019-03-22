import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class AnalyticsLineChart extends Component {
  render() {
    return (
      <div hidden={!this.props.analytics.active} className="col-md-9 lineChart">
        <LineChart width={window.innerWidth * 0.7} height={250} data={this.props.lineChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onMouseMove={(e)=> console.log(e.activeLabel, 'hi')}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="move" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="setupWeight" stroke="#8884d8" />
          <Line type="monotone" dataKey="materialWeight" stroke="#82ca9d" />
          <Line type="monotone" dataKey="attackWeight" stroke="#e07b33" />
          <Line type="monotone" dataKey="threatWeight" stroke="#dd3918" />
          <Line type="monotone" dataKey="totalWeight" stroke="#1749dd" />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = ({analytics}) => {
  return {analytics}
}

export default connect(mapStateToProps)(AnalyticsLineChart)
