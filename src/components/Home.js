import React, { Component } from 'react'
import '../styles/home.css'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return <div>Home</div>
  }
}

const mapStateToProps = ({}) => {
  return {}
}

export default connect(mapStateToProps)(Home)
