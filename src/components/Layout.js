import React from 'react'
import { Route, Switch } from 'react-router-dom'
import '../styles/layout.css'
import Board from './Board'
import SideBar from './SideBar'
import GameInfo from './GameInfo'
import ActiveGames from './ActiveGames'
import AllActiveGames from './AllActiveGames'
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'
import CreateGameModal from './CreateGameModal'
import PromotePawnModal from './PromotePawnModal'
import GameOverModal from './GameOverModal'
import MessagePromptModal from './MessagePromptModal'

export const Layout = () => {
  return(
    <div className='container-fluid justify-content-center layout'>
      <LoginModal />
      <SignUpModal />
      <CreateGameModal />
      <PromotePawnModal />
      <GameOverModal />
      <MessagePromptModal />
      <div className='row'>
        <GameInfo/>
        <Switch>
          <Route exact path='/' component={Board} />
          <Route exact path='/games' component={ActiveGames} />
          <Route exact path='/allGames' component={AllActiveGames} />
          <Route exact path='/games/:id' component={Board} />
        </Switch>
        <SideBar/>
      </div>
    </div>
  )
}
