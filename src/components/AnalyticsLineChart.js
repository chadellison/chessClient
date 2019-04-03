import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'
import { updateFocusSquareAction } from '../actions/analyticsActions'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class AnalyticsLineChart extends Component {

  updateFocusSquare = (e) => {
    if(e.activeLabel) {
      this.props.dispatch(updateFocusSquareAction(e.activeLabel.slice(-2)))
    } else {
      this.props.dispatch(updateFocusSquareAction(null))
    }
  }

  render() {
    return (
      <div hidden={!this.props.analytics.active} className="col-md-9 lineChart">
        <LineChart width={window.innerWidth * 0.7} height={250} data={this.props.lineChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            onMouseMove={(e)=> this.updateFocusSquare(e)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="move" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="white" stroke="#8884d8" />
          <Line type="monotone" dataKey="black" stroke="#82ca9d" />
          <Line type="monotone" dataKey="draw" stroke="#e07b33" />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = ({analytics}) => {
  return {analytics}
}

export default connect(mapStateToProps)(AnalyticsLineChart)
