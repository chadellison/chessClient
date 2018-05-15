export const API_HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://chess-engine-server.herokuapp.com'

export const WEBSOCKET_HOST = process.env.NODE_ENV === 'development' ? 'ws://localhost:3001/cable' : 'wss://chess-engine-server.herokuapp.com/cable'
