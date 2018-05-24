import React, { Component } from 'react'
import '../styles/createGameModal.css'
import { connect } from 'react-redux'
import {createGameModalAction} from '../actions/modalActions'
import Spinner from './Spinner'

class CreateGameModal extends Component {
  handleCancel = (e) => {
    e.preventDefault()
    this.props.dispatch(createGameModalAction(false))
  }

  handleCreateGame = (e) => {
    e.preventDefault()
    // let credentials = {
    //   email: e.target.emailInput.value, password: e.target.passwordInput.value
    // }
    // this.props.dispatch(spinnerAction(true))
    // this.props.dispatch(updateUserAction({loginFailed: false}))
    // this.props.dispatch(loginAction(credentials))
  }

  createGameModal = () => {
    if(this.props.modals.createGameModalActive) {
      return (
        <div className='modalContainer'>
          <form className='createGameModal col-sm-offset-4 col-md-4' onSubmit={(e) => this.handleCreateGame(e)}>
            <h4 className='createGameTitle'>Create Game</h4>
            <label>Select Type:</label>
            <select id='gameType' name='gameType'>
              <option value='human vs human'>Human vs Human</option>
              <option value='human vs machine'>Human vs Machine</option>
              <option value='machine vs machine'>Machine vs Machine</option>
            </select>
            <br/>

            <label>Select Color:</label>
            <select id='colorSelecttion' name='colorSelecttion'>
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
    } else {
      return <div></div>
    }
  }

  render() {
    return this.createGameModal()
  }
}

const mapStateToProps = ({modals, user}) => {
  return {modals, user}
}

export default connect(mapStateToProps)(CreateGameModal)
