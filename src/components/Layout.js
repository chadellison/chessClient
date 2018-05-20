import React, { Component } from 'react'
import '../styles/home.css'
import Board from './Board'
import SideBar from './SideBar'
import { Route, Switch } from 'react-router-dom'
import ActiveGames from './ActiveGames'

export default class Layout extends Component {
  render() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <Switch>
            <Route exact path="/" component={Board} />
            <Route exact path="/games" component={ActiveGames} />
          </Switch>
          <SideBar />
        </div>
      </div>
    )
  }
}
