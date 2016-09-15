var BlockRock = function() {
  Block.call(this, "rock");
  Object.setPrototypeOf(BlockRock.prototype, Block.prototype);
}
