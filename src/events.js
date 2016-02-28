class PieceEvent {
  piece;

  constructor(piece) {
    this.piece = piece;
  }
}

export class PieceDroppedEvent extends PieceEvent {
  square;

  constructor(piece, square) {
    super(piece);
    this.square = square;
  }
}
