import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/layout.css'
import Board from './Board'
import SideBar from './SideBar'
import ActiveGames from './ActiveGames'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import CreateGameModal from './CreateGameModal'
import PromotePawnModal from './PromotePawnModal'

export default class Layout extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <LoginModal />
          <SignUpModal />
          <CreateGameModal />
          <PromotePawnModal />
          <Switch>
            <Route exact path='/' component={Board} />
            <Route exact path='/games' component={ActiveGames} />
            <Route exact path='/games/:id' component={Board} />
          </Switch>
          <SideBar/>
        </div>
      </div>
    )
  }
}
