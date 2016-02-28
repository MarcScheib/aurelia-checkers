export class Board {
  squares = [];

  addSquare(square) {
    this.squares.push(square);
  }

  movePiece(piece, toSquare) {
    console.log(toSquare);
    toSquare.setPiece(piece);
    for (square in this.squares) {
      console.log(square);
    }
  }
}
