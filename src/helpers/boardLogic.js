import MoveLogic from './moveLogic'
import jsonPieces from '../json/pieces'

export const PIECE_CODE = {
    king: 'K', queen: 'Q', bishop: 'B', knight: 'N', rook: 'R', pawn: ''
}

export const LETTER_KEY = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 }

export const updateAttributes = (game, newPosition, pieceType = '') => {
  let clonedGame = JSON.parse(JSON.stringify(game))
  clonedGame.attributes.notation = updateGameNotation(clonedGame, newPosition, pieceType)
  clonedGame.attributes.moves.push(`${clonedGame.selected.positionIndex}${newPosition}`)
  return clonedGame.attributes
}

export const updateGameNotation = (game, newPosition, pieceType) => {
  let moveLogic = new MoveLogic()
  let notation = JSON.parse(JSON.stringify(game.attributes.notation))

  if (!game.id) {
    let piece = JSON.parse(JSON.stringify(game.selected))
    let clonedGame = JSON.parse(JSON.stringify(game))
    notation = notation + moveLogic.createNotation(clonedGame, piece, newPosition, pieceType)
    return notation
  } else {
    return notation
  }
}

export const isLastMove = (position, moves) => {
  let move = moves[moves.length -1]
  return move && position === (move[move.length -2] + move[move.length -1])
}

export const rows = (userId, blackPlayerId) => {
  let rows = ['8', '7', '6', '5', '4', '3', '2', '1']
  if (userId && userId === blackPlayerId) {
    return rows.reverse()
  } else {
    return rows
  }
}

export const columns = (userId, blackPlayerId) => {
  let columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  if (userId && userId === blackPlayerId) {
    return columns.reverse()
  } else {
    return columns
  }
}

export const findGravater = (player, game) => {
  if (player.id) {
    return `https://www.gravatar.com/avatar/${player.hashedEmail}`
  } else {
    return `https://robohash.org/${game.attributes.aiPlayer.name}`
  }
}

export const nextTurn = (currentTurn) => {
  return currentTurn === 'white' ? 'black' : 'white'
}

export const updateBoard = (game, newPosition) => {
  let pieces = JSON.parse(JSON.stringify(game.pieces))

  pieces = pieces.filter((piece) => {
    return piece.position !== newPosition
  }).map((piece) => {
    if (piece.positionIndex === game.selected.positionIndex) {
      piece = updatePiece(piece, newPosition)
    }
    return piece
  })

  return handleAdditionalBoardUpdates(pieces, newPosition, game)
}

export const handleAdditionalBoardUpdates = (pieces, newPosition, game) => {
  let updatedPieces = pieces
  let piece = game.selected
  let moveLogic = new MoveLogic()

  if (!moveLogic.pawnMovedTwo(piece, newPosition)) {
    pieces.forEach((gamePiece) => gamePiece.movedTwo = false)
  }
  if (moveLogic.isEnPassant(piece, newPosition, game.pieces)) {
    let positionToRemove = newPosition[0] + piece.position[1]
    updatedPieces = pieces.filter((piece) => piece.position !== positionToRemove)
  }
  if (moveLogic.isCastle(piece, newPosition)) {
    updatedPieces = moveLogic.handleCastle(piece, newPosition, pieces)
  }
  return updatedPieces
}

export const updatePiece = (piece, newPosition) => {
  let moveLogic = new MoveLogic()
  if (moveLogic.pawnMovedTwo(piece, newPosition)) {
    piece = {...piece, movedTwo: true}
  }
  piece = {...piece, position: newPosition}
  piece.hasMoved = true
  return piece
}

export const mapPiecesToBoard = (game) => {
  let gamePieces = {}

  if (game.previousSetup) {
    let clonedGame = JSON.parse(JSON.stringify(game))
    clonedGame.pieces = JSON.parse(JSON.stringify(jsonPieces))

    game.previousSetup.forEach((move) => {
      clonedGame.selected = findPiece(move, clonedGame.pieces)
      clonedGame.pieces = updateBoard(clonedGame, findPosition(move))
    })

    clonedGame.pieces.forEach((piece) => gamePieces[piece.position] = piece)
  } else {
    game.pieces.forEach((piece) => {
      gamePieces[piece.position] = piece
    })
  }

  return gamePieces
}

export const findPosition = (move) => {
  return move.length === 3 ? move[1] + move[2] : move[2] + move[3]
}

export const findPiece = (move, pieces) => {
  let positionIndex = parseInt(findPositionIndex(move), 10)
  return pieces.filter((piece) => piece.positionIndex === positionIndex)[0]
}

export const findPositionIndex = (move) => {
  return move.length === 3 ? move[0] : move[0] + move[1]
}
