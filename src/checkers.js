import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Board} from './board';
import {Square} from './square';
import {Piece} from './piece';
import {PieceDroppedEvent} from './events';

let squareType = {
  light: 'light',
  dark: 'dark'
};

let pieceType = {
  light: 'light',
  dark: 'dark'
};

@inject(EventAggregator, Board)
export class Checkers {
  board;
  squares = [];

  constructor(eventAggregator, board) {
    this.eventAggregator = eventAggregator;
    this.board = board;

    // create the squares
    let squareCount = 8 * 8;
    for (let i = 0; i < squareCount; i++) {
      let type = this.lightOrDark(i);
      let square = new Square(type, false, type === 'dark');
      this.squares.push(square);
      this.board.addSquare(square);
    }

    let pieceCount = 12;
    for (let i = 0; i < pieceCount; i++) {
      let piece = new Piece(pieceType.light);
      let squareIndex = this.getSquareIndex(i, piece);
      this.board.squares[squareIndex].setPiece(piece);
    }

    for (let i = 0; i < pieceCount; i++) {
      let piece = new Piece(pieceType.dark);
      let squareIndex = this.getSquareIndex(i, piece);
      this.board.squares[squareIndex].setPiece(piece);
    }

    this.eventAggregator.subscribe(PieceDroppedEvent, this.pieceDropped.bind(this));
  }

  /**
   * Helper function that takes a number
   * and calculates if the represented
   * square should be dark or light.
   */
  lightOrDark(index) {
    let x = index % 8;
    let y = Math.floor(index / 8);
    let oddX = x % 2;
    let oddY = y % 2;
    return (oddX ^ oddY) ? squareType.dark : squareType.light;
  }

  getSquareIndex(i, piece) {
    let index = i % 4 * 2 + 1 + Math.floor(i / 4) * 8 - (Math.floor(i / 4) % 2);
    if (piece.type === pieceType.dark) {
      index = 63 - index;
    }

    return index;
  }

  pieceDropped(e) {
    let piece = e.piece;
    let square = e.square;

    // check for validity
    this.board.movePiece(piece, square);
  }
}
