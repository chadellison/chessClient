export const API_HOST = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://tx-holdem-server.herokuapp.com'

export const WEBSOCKET_HOST = window.location.hostname === 'localhost' ? 'ws://localhost:3001/cable' : 'wss://tx-holdem-server.herokuapp.com/cable'
