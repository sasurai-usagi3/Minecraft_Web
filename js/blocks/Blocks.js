var Blocks = {
  dirt: new BlockDirt()
}

for(var blockName in Blocks) {
  Blocks[blockName].registerTextures();
  Blocks[blockName].setTextures();
}
