import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/layout.css'
import Board from './Board'
import SideBar from './SideBar'
import ActiveGames from './ActiveGames'
import LoginModal from './LoginModal'

export default class Layout extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <LoginModal />
          <Switch>
            <Route exact path='/' component={Board} />
            <Route exact path='/games' component={ActiveGames} />
          </Switch>
          <SideBar/>
        </div>
      </div>
    )
  }
}
