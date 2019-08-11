import React, { Component } from 'react'
import '../styles/createGameModal.css'
import { connect } from 'react-redux'
import Spinner from './Spinner'
import { handleModalAction, spinnerAction } from '../actions/modalActions'
import { createGameAction, updateGamePayload, machineVsMachineGameAction } from '../actions/gameActions'

class CreateGameModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(handleModalAction({createGame: false}))
    this.props.dispatch(updateGamePayload({errors: false}))
  }

  handleCreateGame = (e) => {
    e.preventDefault()
    let gameData = {
      game_type: e.target.gameType.value, color: e.target.colorSelection.value
    }
    if (e.target.gameType.value === 'machine vs machine') {
      this.props.dispatch(machineVsMachineGameAction(gameData, this.props.user.token))
    } else {
      this.props.dispatch(createGameAction(gameData, this.props.user.token))
    }
    this.props.dispatch(updateGamePayload({errors: false}))
    this.props.dispatch(spinnerAction(true))
  }

  submissionFailed() {
    if(this.props.game.errors) {
      return (
        <h3 className='submissionFailedText'>Submission Failed. Please try again</h3>
      )
    } else {
      return ''
    }
  }

  displaySpinner() {
    if(this.props.modals.spinnerActive) {
      return <Spinner />
    } else {
      return ''
    }
  }

  render() {
    return (
      <div className='modalContainer' hidden={!this.props.modals.createGame}>
        <form className='createGameModal col-sm-offset-4 col-md-4' onSubmit={(e) => this.handleCreateGame(e)}>
          {this.submissionFailed()}
          {this.displaySpinner()}
          <h4 className='createGameTitle'>Create Game</h4>
          <label>Select Type:</label>
          <select id='gameType' name='gameType'>
            <option value='human vs human'>Human vs Human</option>
            <option value='human vs machine'>Human vs Machine</option>
            <option value='machine vs machine'>Machine vs Machine</option>
          </select>
          <br/>

          <label>Select Color:</label>
          <select id='colorSelection' name='colorSelection'>
            <option value='white'>White</option>
            <option value='black'>Black</option>
          </select>
          <br/>

          <input type='submit' className='submitCreateGame'/>
          <br/>
          <button className='cancelButton' onClick={(e) => this.handleCancel(e)}>Cancel</button>
          <div className='modalPadding'></div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({modals, user, game}) => {
  return {modals, user, game}
}

export default connect(mapStateToProps)(CreateGameModal)
