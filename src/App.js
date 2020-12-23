import React from 'react'
import './styles/App.css'
import { Route, Switch } from 'react-router-dom'
import Board from './components/Board'
import SideBar from './components/SideBar'
import GameInfo from './components/GameInfo'
import ActiveGames from './components/ActiveGames'
import Modal from './components/Modal'
import AnalyticsLineChart from './components/AnalyticsLineChart'

const App = () => {
  return (
    <div className='App'>
      <main>
        <div className='container-fluid justify-content-center layout'>
          <Modal />
          <div className='row'>
            <GameInfo/>
            <Switch>
              <Route exact path='/' component={Board} />
              <Route exact path='/games' component={ActiveGames} />
              <Route exact path='/games/:id' component={Board} />
            </Switch>
            <SideBar/>
            <AnalyticsLineChart />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
