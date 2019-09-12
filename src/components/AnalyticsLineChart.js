import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'
import { updateFocusSquareAction, clearFocusSquare } from '../actions/analyticsActions'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class AnalyticsLineChart extends Component {

  updateFocusSquare = (e) => {
    if (e.activeLabel) {
      this.props.dispatch(updateFocusSquareAction(e.activeLabel))
    }
  }

  render() {
    return (
      <div hidden={!this.props.analytics.active} className="lineChart" onMouseLeave={() => this.props.dispatch(clearFocusSquare())}>
        <LineChart width={window.innerWidth * 0.73} height={250} data={this.props.lineChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(e)=> this.updateFocusSquare(e)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="move" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="evaluation" stroke="#cd853f" />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = ({analytics}) => {
  return {analytics}
}

export default connect(mapStateToProps)(AnalyticsLineChart)
