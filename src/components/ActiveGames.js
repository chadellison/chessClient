import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/activeGames.css'
import Thumbnail from './Thumbnail'
import { push } from 'react-router-redux'
import {fetchActiveGamesAction} from '../actions/activeGamesActions'
import {loginModalAction} from '../actions/modalActions'

class ActiveGames extends Component {
  componentWillMount() {
    if(this.props.user.token) {
      this.props.dispatch(fetchActiveGamesAction())
    } else {
      this.props.dispatch(push('/'))
      this.props.dispatch(loginModalAction(true))
    }
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

const mapStateToProps = ({activeGames, user}) => {
  return {activeGames, user}
}

export default connect(mapStateToProps)(ActiveGames)
