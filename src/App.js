import React, { Component } from 'react'
import './styles/App.css'
import Layout from './components/Layout'
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <Layout />
        </main>
      </div>
    )
  }
}

export default App
