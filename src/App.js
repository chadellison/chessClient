import React, { Component } from 'react'
import './styles/App.css'
import Home from './components/Home'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <Route exact path='/' component={Home} />
        </main>
      </div>
    )
  }
}

export default App
