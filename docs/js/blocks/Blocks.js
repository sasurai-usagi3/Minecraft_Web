const Blocks = {
  air: new BlockAir(),
  dirt: new BlockDirt(),
  rock: new BlockRock(),
  bedrock: new BlockBedrock()
}

for(let blockName in Blocks) {
  Blocks[blockName].registerTextures();
  Blocks[blockName].setTextures();
}
