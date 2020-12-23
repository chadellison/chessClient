import React from 'react'
import '../styles/gameOverModal.css'
import { connect } from 'react-redux'
import { handleModalAction } from '../actions/modalActions'

const GameOverModal = ({handleModalAction, game}) => {
  return (
    <div className='modalContainer'>
      <div className='gameOverModal col-sm-offset-4 col-md-4'>
        <div className='gameOverModalTop'></div>
        <div className='outcomeText'>{game.attributes.outcome}</div>
        <div onClick={() => handleModalAction({gameOver: false})}
          className='gameOverButton'>
            Ok
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = ({game}) => {
  return {game}
}

const mapDispatchToProps = {
  handleModalAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(GameOverModal)
