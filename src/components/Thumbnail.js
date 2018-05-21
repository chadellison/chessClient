import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/thumbnail.css'

class Thumbnail extends Component {
  render() {
    return(
      <div className='col-lg-3 col-xs-12'>
        <div className='row justify-content-center'>
          Thumbnail
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({}) => {
  return {}
}

export default connect(mapStateToProps)(Thumbnail)
