var Blocks = {
  dirt: new BlockDirt(),
  rock: new BlockRock(),
  bedrock: new BlockBedrock()
}

for(var blockName in Blocks) {
  Blocks[blockName].registerTextures();
  Blocks[blockName].setTextures();
}
