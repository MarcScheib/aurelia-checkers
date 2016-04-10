export class Board {
  squares = [];

  addSquare(square) {
    this.squares.push(square);
  }

  movePiece(piece, toSquare) {
    for (let square of this.squares) {
      if (square.piece === piece) {
        square.piece = undefined;
      }
    }
    toSquare.setPiece(piece);
  }
}
