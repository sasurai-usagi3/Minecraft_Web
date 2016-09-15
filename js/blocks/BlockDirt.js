var BlockDirt = function() {
  Block.call(this, "dirt");
  Object.setPrototypeOf(BlockDirt.prototype, Block.prototype);
}
