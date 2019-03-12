import React, { Component } from 'react'
import '../styles/gameOverModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

class GameOverModal extends Component {
  render() {
    return (
      <div className='modalContainer' hidden={!this.props.modals.gameOver}>
        <div className='gameOverModal col-sm-offset-4 col-md-4'>
          <div className='gameOverModalTop'></div>
          <div className='outcomeText'>{this.props.game.attributes.outcome}</div>
          <div onClick={() => this.props.dispatch(handleModalAction({gameOver: false}))}
            className='gameOverButton'>
              Ok
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({game, modals}) => {
  return {game, modals}
}

export default connect(mapStateToProps)(GameOverModal)
