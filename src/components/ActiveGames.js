import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/activeGames.css'
import Thumbnail from './Thumbnail'
import {fetchActiveGamesAction} from '../actions/activeGamesActions'

class ActiveGames extends Component {
  componentWillMount() {
    // connect to all games socket
    this.props.dispatch(fetchActiveGamesAction())
  }

  renderActiveGames = () => {
    return this.props.activeGames.map((game, index) => {
      return (
        <Thumbnail key={`thumbnail${index}`} game={game} />
      )
    })
  }

  render() {
    return(
      <div className='col-lg-9 col-md-12 activeGames'>
        <hr/>
        <h3 className='activeGamesTitle'>Active Games</h3>
        <div className='row justify-content-center'>
          {this.renderActiveGames()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({activeGames}) => {
  return {activeGames}
}

export default connect(mapStateToProps)(ActiveGames)
