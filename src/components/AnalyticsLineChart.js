import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'
import { updateFocusSquareAction, clearFocusSquare, fetchAnalyticsDataAction } from '../actions/analyticsActions'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class AnalyticsLineChart extends Component {
  // componentDidMount() {
  //   this.props.fetchAnalyticsDataAction(this.props.game.notation)
  // }
  //
  // componentDidUpdate(oldProps) {
  //   if (oldProps.game.notation !== this.props.game.notation) {
  //     this.props.fetchAnalyticsDataAction(this.props.game.notation)
  //   }
  // }

  updateFocusSquare = (e) => {
    if (e.activeLabel) {
      this.props.updateFocusSquareAction(e.activeLabel)
    }
  }

  render() {
    return (
      <div hidden={!this.props.analytics.active} className="lineChart" onMouseLeave={() => this.props.clearFocusSquare()}>
        <LineChart width={window.innerWidth} height={250} data={this.props.analytics.lineChartData}
          margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
            onMouseMove={(e) => this.updateFocusSquare(e)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="move" />
          <YAxis />
          <Tooltip />
          <Legend />
          {<Line type="monotone" dataKey="evaluation" stroke="#cd853f" />}
          <Line type="monotone" dataKey="stockfish_evaluation" stroke="#189fde" />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = ({analytics, game}) => {
  return {analytics, game}
}

const mapDispatchToProps = {
  clearFocusSquare,
  fetchAnalyticsDataAction,
  updateFocusSquareAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsLineChart)
