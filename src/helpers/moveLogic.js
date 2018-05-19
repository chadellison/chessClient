import {LETTER_KEY, PIECE_NOTATION_KEY} from './boardLogic'
// import emptyBoard from '../emptyBoard'

export default class MoveLogic {
  // createNotation(piece, coordinates, board, gameMoves, pieceType) {
  //   if (piece.pieceType === 'king' && coordinates[0] &&
  //     Math.abs(LETTER_KEY[piece.position[0]] - LETTER_KEY[coordinates[0]]) === 2) {
  //       return coordinates[0] === 'c' ? 'O-O-O.' : 'O-O.'
  //   }
  //
  //   let notation = PIECE_NOTATION_KEY[piece.pieceType]
  //   notation += this.findStartNotation(piece, coordinates, board, gameMoves)
  //   notation += this.capturePiece(notation, board, coordinates, piece)
  //   notation += coordinates
  //   notation += this.upgradedPawn(piece, pieceType)
  //   return notation + '.'
  // }
  //
  // upgradedPawn(piece, pieceType) {
  //   if (pieceType && pieceType !== piece.pieceType) {
  //     return '=' + PIECE_NOTATION_KEY[pieceType]
  //   } else {
  //     return ''
  //   }
  // }
  //
  // capturePiece(notation, board, coordinates, piece) {
  //   if (board[coordinates].piece) {
  //     return notation === '' ? piece.position[0] + 'x' : 'x'
  //   } else if(piece.pieceType === 'pawn' && piece.position[0] !== coordinates[0]) {
  //     return notation === '' ? piece.position[0] + 'x' : 'x'
  //   }
  //   else {
  //     return ''
  //   }
  // }
  //
  // findStartNotation(piece, coordinates, board, gameMoves) {
  //   let startNotation = ''
  //
  //   let pieces = Object.values(board).filter((boardPiece) => {
  //     return (boardPiece.piece &&
  //       boardPiece.piece.color === piece.color &&
  //       boardPiece.piece.pieceType === piece.pieceType &&
  //       this.isValidMove(boardPiece.piece, coordinates, board, gameMoves))
  //   }).map((boardPiece) => boardPiece.piece)
  //
  //   if (pieces.length > 1) {
  //     pieces = this.similarPieces(0, pieces, piece)
  //     if (pieces.length > 1) {
  //       pieces = this.similarPieces(1, pieces, piece)
  //       if (pieces.length > 1) {
  //         startNotation = piece.position
  //       } else {
  //         startNotation = piece.position[1]
  //       }
  //     } else {
  //       startNotation = piece.position[0]
  //     }
  //   }
  //
  //   return startNotation
  // }

  // similarPieces(index, samePieces, piece) {
  //   return samePieces.filter((boardPiece) => {
  //     return boardPiece.position[index] === piece.position[index]
  //   })
  // }

  movesLeft(position) {
    let moves = []
    let column = position[0]

    while(column !== 'a') {
      column = String.fromCharCode(column.charCodeAt(0) - 1)
      moves.push(column + position[1])
    }
    return moves
  }

  movesRight(position) {
    let moves = []
    let column = position[0]

    while(column !== 'h') {
      column = String.fromCharCode(column.charCodeAt(0) + 1)
      moves.push(column + position[1])
    }
    return moves
  }

  movesUp(position) {
    let moves = []
    let row = parseInt(position[1], 10)

    while(row !== 8) {
      row += 1
      moves.push(position[0] + row)
    }
    return moves
  }

  movesDown(position) {
    let moves = []
    let row = parseInt(position[1], 10)

    while(row !== 1) {
      row -= 1
      moves.push(position[0] + row)
    }
    return moves
  }

  movesForRook(position) {
    return this.movesLeft(position)
      .concat(this.movesRight(position))
      .concat(this.movesUp(position))
      .concat(this.movesDown(position))
  }

  movesForBishop(position) {
    let moves = []
    let count = 0
    let movesRight = this.movesRight(position)
    let movesLeft = this.movesLeft(position)
    let movesUp = this.movesUp(position)
    let movesDown = this.movesDown(position)

    while (count < 7) {
        moves.push(movesRight[count] + movesUp[count])
        moves.push(movesLeft[count] + movesUp[count])
        moves.push(movesLeft[count] + movesDown[count])
        moves.push(movesRight[count] + movesDown[count])
        count += 1
    }
    return moves.filter((move) => move && move.length === 4)
      .map((coordinates) => coordinates[0] + coordinates[3])
  }

  movesForQueen(position) {
    return this.movesForRook(position).concat(this.movesForBishop(position))
  }

  movesForKnight(position) {
    let knightMoves = []
    let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] + 2, LETTER_KEY[position[0]] - 2]
    let rows = [parseInt(position[1], 10), parseInt(position[1], 10) + 2, parseInt(position[1], 10) - 2]

    this.movesForRook(position).filter((move) => {
      return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1], 10))
    }).forEach((move) => {
      if(move[0] === position[0]) {
        knightMoves.push(String.fromCharCode(move[0].charCodeAt(0) + 1) + move[1])
        knightMoves.push(String.fromCharCode(move[0].charCodeAt(0) - 1) + move[1])
      } else {
        knightMoves.push(move[0] + (parseInt(move[1], 10) + 1))
        knightMoves.push(move[0] + (parseInt(move[1], 10) - 1))
      }
    })

    return knightMoves.filter((move) => this.validCoordinates(move))
  }

  findPieceByPosition(position, pieces) {
    return pieces.filter((piece) => piece.position === position)[0]
  }

  movesForKing(position, pieces) {
    let columns = [LETTER_KEY[position[0]], LETTER_KEY[position[0]] - 1, LETTER_KEY[position[0]] + 1]
    let rows = [parseInt(position[1], 10), parseInt(position[1], 10) - 1, parseInt(position[1], 10) + 1]

    let moves = this.movesForQueen(position).filter((move) => {
        return columns.includes(LETTER_KEY[move[0]]) && rows.includes(parseInt(move[1], 10))
    })
    let piece = this.findPieceByPosition(position, pieces)

    if(piece.pieceType === 'king' && !piece.hasMoved) {
      let leftRook = this.findPieceByPosition('a' + position[1], pieces)
      let castleSpace = this.findPieceByPosition('b' + position[1], pieces)
      let rightRook = this.findPieceByPosition('h' + position[1], pieces)

      if(leftRook && leftRook.pieceType === 'rook' && !leftRook.hasMoved && !castleSpace) {
        moves.push(String.fromCharCode(position[0].charCodeAt(0) - 2) + position[1])
      }
      if(rightRook && rightRook.pieceType === 'rook' && !rightRook.hasMoved) {
        moves.push(String.fromCharCode(position[0].charCodeAt(0) + 2) + position[1])
      }
    }
    return moves
  }

  movesForPawn(position, pieces) {
    let moves = []
    let nextSquare = this.oneForward(position, this.getColor(position, pieces))
    if(this.isOpen(nextSquare, pieces)) {
      moves.push(nextSquare)
      if(this.isOpen(this.oneForward(nextSquare, this.getColor(position, pieces)), pieces) && ['2', '7'].includes(position[1])) {
        moves.push(this.oneForward(nextSquare, this.getColor(position, pieces)))
      }
    }

    return moves.concat(this.canCapturePiece(position, pieces)).concat(this.canEnPassant(position, pieces))
  }

  oneForward(position, color) {
    if (color === 'white') {
      return position[0] + (parseInt(position[1], 10) + 1)
    } else {
      return position[0] + (parseInt(position[1], 10) - 1)
    }
  }

  oneLeft(position) {
    return String.fromCharCode(position[0].charCodeAt(0) - 1) + position[1]
  }

  oneRight(position) {
    return String.fromCharCode(position[0].charCodeAt(0) + 1) + position[1]
  }

  isOpen(positionToCheck, pieces) {
    if (this.validCoordinates(positionToCheck)) {
      return !this.findPieceByPosition(positionToCheck, pieces)
    }
    return false
  }

  validCoordinates(coordinates) {
    return Object.keys(LETTER_KEY).includes(coordinates[0]) &&
      Object.values(LETTER_KEY).includes(parseInt(coordinates[1], 10))
  }

  canEnPassant(position, pieces) {
    let moves = []
    let piece = this.findPieceByPosition(position, pieces)
    let leftPiece = this.findPieceByPosition(this.oneLeft(position), pieces)
    let rightPiece = this.findPieceByPosition(this.oneRight(position), pieces)

    if (leftPiece && leftPiece.movedTwo) {
      moves.push(leftPiece.position[0] + this.oneForward(position, piece.color)[1])
    }
    if (rightPiece && rightPiece.movedTwo) {
      moves.push(rightPiece.position[0] + this.oneForward(position, piece.color)[1])
    }
    return moves
  }

  isEnPassant(piece, coordinates, pieces) {
    if(coordinates[0] !== piece.position[0] &&
      !this.findPieceByPosition(coordinates, pieces) &&
      piece.pieceType === 'pawn') {
        pieces = pieces.filter((piece) => piece.position !== (coordinates[0] + piece.position[1]))
    }
    return pieces
  }

  canCapturePiece(position, pieces) {
    let moves = []
    if(this.checkDiagonal(position, this.oneLeft(position), pieces)) {
      moves.push(this.oneLeft(this.oneForward(position, this.getColor(position, pieces))))
    }

    if(this.checkDiagonal(position, this.oneRight(position), pieces)) {
      moves.push(this.oneRight(this.oneForward(position, this.getColor(position, pieces))))
    }
    return moves
  }

  checkDiagonal(position, direction, pieces) {
    if(this.validCoordinates(this.oneForward(direction, this.getColor(position, pieces)))) {
      let potentialEnemy = this.findPieceByPosition(this.oneForward(direction, this.getColor(position, pieces)), pieces)
      return potentialEnemy && this.getColor(position, pieces) !== potentialEnemy.color
    }
  }

  validMovePath(position, destination, pieces) {
    let result = true
    let moves = []
    let columnMin = position[0] < destination[0] ? position[0] : destination[0]
    let columnMax = position[0] > destination[0] ? position[0] : destination[0]
    let rowMin = position[1] < destination[1] ? position[1] : destination[1]
    let rowMax = position[1] > destination[1] ? position[1] : destination[1]

    if (position[0] === destination[0]) {
      moves = this.movesUp(position).concat(this.movesDown(position)).filter((move) => {
        return move[1] < rowMax && move[1] > rowMin
      })
    }

    if (position[1] === destination[1]) {
      moves = this.movesLeft(position).concat(this.movesRight(position)).filter((move) => {
        return move[0] < columnMax && move[0] > columnMin
      })
    }

    if (Math.abs(LETTER_KEY[position[0]] - LETTER_KEY[destination[0]]) === Math.abs(position[1] - destination[1])) {
      moves = this.movesForBishop(position).filter((move) => {
          return move[0] < columnMax &&
            move[0] > columnMin &&
            move[1] < rowMax &&
            move[1] > rowMin
      })
    }
    moves.forEach((move) => {
      if (!this.isOpen(move, pieces)) {
          result = false
      }
    })
    return result
  }

  validDestination(pieces, color, destination) {
    let piece = this.findPieceByPosition(destination, pieces)
    if (piece) {
      return color !== piece.color
    } else {
      return true
    }
  }

  filterByPosition(position, pieces) {
    return pieces.filter((piece) => piece.position !== position)
  }

  kingIsSafe(piece, nextMove, pieces) {
    let result = true
    let positions = [nextMove]

    if (this.kingCastle(piece, nextMove)) {
      positions.push(piece.position[0] > nextMove[0] ? this.oneLeft(piece.position) : this.oneRight(piece.position))
      positions.push(piece.position)
    }

    positions.forEach((position) => {
      let updatedPieces = this.filterByPosition(nextMove, pieces).map((gamePiece) => {
        if (gamePiece.positionIndex === piece.positionIndex) {
          gamePiece.position = position
        }
        return gamePiece
      })

      this.piecesByColor(updatedPieces, this.opponentColor(piece.color)).forEach((eachPiece) => {
        if (this.inCheck(eachPiece, updatedPieces, piece.color)) {
          result = false
        }
      })
    })
    return result
  }

  piecesByColor(pieces, color) {
    return pieces.filter((piece) => piece.color === color)
  }

  kingCastle(piece, nextMove) {
    return piece.pieceType === 'king' &&
      Math.abs(LETTER_KEY[piece.position[0]] - LETTER_KEY[nextMove[0]]) === 2
  }

  isCastle(piece, coordinates, updatedBoard) {
    if(piece.pieceType === 'king' && piece.position[0] === 'e' && ['c', 'g'].includes(coordinates[0])) {
      let oldColumn
      let newColumn

      if (piece.position[0] > coordinates[0]) {
        oldColumn = 'a'
        newColumn = 'd'
      } else {
        oldColumn = 'h'
        newColumn = 'f'
      }
      let rook = updatedBoard[oldColumn + coordinates[1]].piece

      rook.position = (newColumn + coordinates[1])
      updatedBoard[oldColumn + coordinates[1]].piece = null
      updatedBoard[newColumn + coordinates[1]].piece = rook
    }
    return updatedBoard
  }

  kingLocation(pieces, color) {
    return pieces.filter((piece) => {
      return piece.pieceType === 'king' && piece.color === color
    })[0].position
  }

  opponentColor(color) {
    return color === 'white' ? 'black' : 'white'
  }

  getColor(position, pieces) {
    return this.findPieceByPosition(position, pieces).color
  }

  inCheck(piece, pieces, color) {
    return this.isValidMove(piece, this.kingLocation(pieces, color), pieces)
  }

  checkmate(pieces, color) {
    return this.cannotMove(pieces, color) &&
      this.currentThreats(pieces, color).length > 0
  }

  stalemate(pieces, color, gameMoves) {
    let caseOne = (this.cannotMove(pieces, color) &&
      this.currentThreats(pieces, color).length === 0)

    let caseTwo = this.insufficientPieces(pieces, 'white') &&
      this.insufficientPieces(pieces, 'black')

    let caseThree = this.threeFoldRepitition(gameMoves)
    return caseOne || caseTwo || caseThree
  }

  threeFoldRepitition(gameMoves) {
    if (gameMoves.length > 9) {
      return gameMoves.slice(gameMoves.length - 10, gameMoves.length - 1)
               .map((move) => move.value)
               .filter((move, index, self) => index === self.indexOf(move)).length < 5
    }
  }

  insufficientPieces(pieces, color) {
    let lessThanThree = this.piecesByColor(pieces, color).length < 3
    let onlyBishopOrKnight = true

    this.piecesByColor(pieces, color).forEach((piece) => {
      if (!['bishop', 'knight', 'king'].includes(piece.pieceType)) {
        onlyBishopOrKnight = false
      }
    })

    return lessThanThree && onlyBishopOrKnight
  }

  currentThreats(pieces, color) {
    return this.piecesByColor(pieces, this.opponentColor(color)).filter((piece) => {
      return this.inCheck(piece, pieces, color)
    })
  }

  cannotMove(pieces, color) {
    let result = true

    this.piecesByColor(pieces, color).forEach((piece) => {
      if(this.movesForPiece(piece, pieces).filter((move) => {
        return this.isValidMove(piece, move, pieces)
      }).length > 0) {
        result = false
      }
    })
    return result
  }

  isValidMove(piece, nextMove, pieces) {
    return this.movesForPiece(piece, pieces).includes(nextMove) &&
      this.validMovePath(piece.position, nextMove, pieces) &&
      this.validDestination(pieces, piece.color, nextMove) &&
      this.kingIsSafe(piece, nextMove, pieces)
  }

  movesForPiece(piece, pieces) {
    let types = {
      pawn: this.movesForPawn(piece.position, pieces),
      knight: this.movesForKnight(piece.position),
      bishop: this.movesForBishop(piece.position),
      rook: this.movesForRook(piece.position),
      queen: this.movesForQueen(piece.position),
      king: this.movesForKing(piece.position, pieces)
    }
    return types[piece.pieceType]
  }

  // setBoard(gameMoves, board) {
  //   let piecesAndMoves = {}
  //
  //   Object.values(board).forEach((square) => {
  //     if(square.piece) {
  //       piecesAndMoves[square.piece.positionIndex] = square.piece.position
  //     }
  //   })
  //
  //   gameMoves.forEach((piece) => {
  //     board = this.isCastle(board[piecesAndMoves[piece.positionIndex]].piece, piece.position, board)
  //     board = this.isEnPassant(board[piecesAndMoves[piece.positionIndex]].piece, piece.position, board)
  //
  //     board[piecesAndMoves[piece.positionIndex]].piece = null
  //     board[piece.position].piece = piece
  //     piecesAndMoves[piece.positionIndex] = piece.position
  //   })
  //   return board
  // }

  // setPieces(pieces) {
  //   let board = JSON.parse(JSON.stringify(emptyBoard))
  //
  //   pieces.forEach((piece) => {
  //     board[piece.position].piece = piece
  //   })
  //
  //   return board
  // }
}
