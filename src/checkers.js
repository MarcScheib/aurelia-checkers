import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

import {Board} from './board';
import {Square} from './square';
import {Piece} from './piece';

var squareType = {
  light: 'light',
  dark: 'dark'
};

var pieceType = {
  light: 'light',
  dark: 'dark'
};

@inject(EventAggregator, Board)
export class Checkers {
  board;

  constructor(eventAggregator, board) {
    this.eventAggregator = eventAggregator;
    this.board = board;

    // create the squares
    let squareCount = 8 * 8;
    for (let i = 0; i < squareCount; i++) {
      let type = this.lightOrDark(i);
      let square = new Square(type, false, type === 'dark');
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
  }

  /**
   * Helper function that takes a number
   * and calculates if the represented
   * square should be dark or light.
   */
  lightOrDark(index) {
    var x = index % 8;
    var y = Math.floor(index / 8);
    var oddX = x % 2;
    var oddY = y % 2;
    return (oddX ^ oddY) ? squareType.dark : squareType.light;
  }

  getSquareIndex(i, piece) {
    let index = i % 4 * 2 + 1 + Math.floor(i / 4) * 8 - (Math.floor(i / 4) % 2);
    if (piece.type === pieceType.dark) {
      index = 63 - index;
    }

    return index;
  }
}
