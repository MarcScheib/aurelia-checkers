export class Square {
  type;
  canDrag;
  canDrop;
  piece;

  constructor(type, canDrag, canDrop) {
    this.type = type;
    this.canDrag = canDrag;
    this.canDrop = canDrop;
  }

  setPiece(piece) {
    this.piece = piece;
  }
}
