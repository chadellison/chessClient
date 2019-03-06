import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/AnalyticsLineChart.css'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

const data = [
{
name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
},
{
name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
},
{
name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
},
{
name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
},
{
name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
},
{
name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
},
{
name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
},
]

class AnalyticsLineChart extends Component {
  render() {
    return (
      <div hidden={!this.props.analytics.active} className="col-md-9 lineChart">
        <LineChart width={window.innerWidth * 0.7} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    )
  }
}

const mapStateToProps = ({analytics}) => {
  return {analytics}
}

export default connect(mapStateToProps)(AnalyticsLineChart)
