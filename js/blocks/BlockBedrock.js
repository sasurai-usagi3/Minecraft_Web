var BlockBedrock = function() {
  Block.call(this, "bedrock");
  Object.setPrototypeOf(BlockBedrock.prototype, Block.prototype);
}
