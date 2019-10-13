import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/activeGames.css'
import Thumbnail from './Thumbnail'
import { Thumbnails } from './Thumbnails'
import { push } from 'react-router-redux'
import { fetchActiveGamesAction } from '../actions/activeGamesActions'
import { handleModalAction } from '../actions/modalActions'
import { resetGameAction } from '../actions/gameActions'
import { updateChatChannelAction } from '../actions/chatActions'

class ActiveGames extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.dispatch(fetchActiveGamesAction(this.props.user.token))
      this.props.dispatch(updateChatChannelAction('GroupChatChannel'))
      this.props.dispatch(resetGameAction())
    } else {
      this.props.dispatch(push('/'))
      this.props.dispatch(handleModalAction({login: true}))
    }
  }

  renderActiveGames = () => {
    return this.props.activeGames.map((game, index) => {
      return (
        <Thumbnail
          key={`thumbnail${index}`}
          thumbnailGame={game}
          buttonContent={'Join'}
        />
      )
    })
  }

  render() {
    return <Thumbnails thumbnails={this.renderActiveGames()}/>
  }
}

const mapStateToProps = ({activeGames, user}) => {
  return {activeGames, user}
}

export default connect(mapStateToProps)(ActiveGames)
