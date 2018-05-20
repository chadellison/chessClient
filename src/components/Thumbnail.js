import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/thumbnail.css'

class Thumbnail extends Component {
  renderActiveGames = () => {
    return this.props.activeGames.map((game) => {
      return (
        <Thumbnail thumbnailGame={game} />
      )
    })
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12'>
        <div className='row justify-content-center'>
          {this.renderActiveGames()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({}) => {
  return {}
}

export default connect(mapStateToProps)(Thumbnail)
