import {LETTER_KEY} from './boardLogic'

const PIECE_CODE = {
    k: 'K', q: 'Q', b: 'B', n: 'N', r: 'R', p: ''
}

const BOARD_KEY = {
  a8: 1,
  b8: 2,
  c8: 3,
  d8: 4,
  e8: 5,
  f8: 6,
  g8: 7,
  h8: 8,
  a7: 9,
  b7: 10,
  c7: 11,
  d7: 12,
  e7: 13,
  f7: 14,
  g7: 15,
  h7: 16,
  a6: 17,
  b6: 18,
  c6: 19,
  d6: 20,
  e6: 21,
  f6: 22,
  g6: 23,
  h6: 24,
  a5: 25,
  b5: 26,
  c5: 27,
  d5: 28,
  e5: 29,
  f5: 30,
  g5: 31,
  h5: 32,
  a4: 33,
  b4: 34,
  c4: 35,
  d4: 36,
  e4: 37,
  f4: 38,
  g4: 39,
  h4: 40,
  a3: 41,
  b3: 42,
  c3: 43,
  d3: 44,
  e3: 45,
  f3: 46,
  g3: 47,
  h3: 48,
  a2: 49,
  b2: 50,
  c2: 51,
  d2: 52,
  e2: 53,
  f2: 54,
  g2: 55,
  h2: 56,
  a1: 57,
  b1: 58,
  c1: 59,
  d1: 60,
  e1: 61,
  f1: 62,
  g1: 63,
  h1: 64
}

export const createNotation = (pieces, piece, newPosition, promotionType) => {
  const pieceType = piece.piece_type.toLowerCase()
  if (pieceType === 'k' && newPosition[0] &&
    Math.abs(LETTER_KEY[piece.position[0]] - LETTER_KEY[newPosition[0]]) === 2) {
      return newPosition[0] === 'c' ? 'O-O-O ' : 'O-O '
  }

  let notation = PIECE_CODE[pieceType]
  notation += findStartNotation(piece, newPosition, pieces)
  notation += handleCaptureNotation(notation, newPosition, piece, pieces)
  notation += newPosition
  notation += promotionType ? '=' + promotionType : ''
  return notation + ' '
}

const findStartNotation = (piece, newPosition, pieces) => {
  let startNotation = ''

  const filteredPieces = pieces.filter((gamePiece) => {
    return (gamePiece.color === piece.color &&
      gamePiece.piece_type === piece.piece_type &&
      gamePiece.valid_moves.includes(newPosition))
  });

  if (filteredPieces.length > 1) {
    const samePieceTypes = sameColumnPieces(filteredPieces, piece)
    if (samePieceTypes.length > 1) {
      startNotation = piece.position[1]
    } else {
      startNotation = piece.position[0]
    }
  }

  return startNotation
}

const handleCaptureNotation = (notation, newPosition, piece, pieces) => {
  if (isOccuppied(pieces, newPosition)) {
    return notation === '' ? piece.position[0] + 'x' : 'x'
  } else if (piece.piece_type.toLowerCase() === 'p' && piece.position[0] !== newPosition[0]) {
    return notation === '' ? piece.position[0] + 'x' : 'x'
  } else {
    return ''
  }
}

const isOccuppied = (pieces, position) => {
  return pieces.filter((piece) => piece.position === position).length > 0
}

const sameColumnPieces = (samePieceTypes, piece) => {
  return samePieceTypes.filter((gamePiece) => {
    return gamePiece.position[0] === piece.position[0]
  })
}

export const isCrossedPawn = (piece, square) => {
  return piece.piece_type.toLowerCase() === 'p' &&
    ['1', '8'].includes(square[1])
}

const updateBoard = (board, piece, move) => {
  let newBoard = {...board}
  newBoard[piece.square_index] = null;
  newBoard[BOARD_KEY[move]] = piece
  return newBoard
}

export const move = (board, game, handleModalAction, sendMoveToServer, square, updateBoardAction, updateGameAction, updateSelectedMoveAction) => {
  const {selected, id} = game;
  if (selected.valid_moves && selected.valid_moves.includes(square)) {
    if (isCrossedPawn(selected, square)) {
      updateGameAction({...game, promotedPawn: {...selected, position: square}})
      handleModalAction({promotePawn: true})
    } else {
      updateBoardAction(updateBoard(board, selected, square));
      const pieces = Object.values(board)
      updateSelectedMoveAction(game.notation.split(' ').length - 1)

      const newNotation = createNotation(pieces, selected, square, null)
      sendMoveToServer({game_id: id, notation: game.notation + newNotation});
    }
  }
}
