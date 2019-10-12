import React from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'
import { updateFocusSquareAction, clearFocusSquare } from '../actions/analyticsActions'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

const updateFocusSquare = (e, updateFocusSquareAction) => {
  if (e.activeLabel) {
    updateFocusSquareAction(e.activeLabel)
  }
}
export const AnalyticsLineChart = ({analytics, updateFocusSquareAction, clearFocusSquare, lineChartData}) => {
  return (
    <div hidden={!analytics.active} className="lineChart" onMouseLeave={clearFocusSquare}>
      <LineChart width={window.innerWidth * 0.73} height={250} data={analytics.lineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseMove={(e)=> updateFocusSquare(e, updateFocusSquareAction)}>
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

const mapDispatchToProps = {
  updateFocusSquareAction,
  clearFocusSquare
}

const mapStateToProps = ({analytics}) => {
  return {analytics}
}

export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsLineChart)
