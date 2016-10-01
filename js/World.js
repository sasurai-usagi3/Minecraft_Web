class World {
  constructor() {
    this.blocksAroundPlayer = [];
    for(let x = 0; x < 16; ++x) {
      this.blocksAroundPlayer[x] = [];
      for(let z = 0; z < 16; ++z) {
        this.blocksAroundPlayer[x][z] = [];
        for(let y = 0; y < 256; ++y) {
          this.blocksAroundPlayer[x][z][y] = [];
          if(y <= 1) { 
            this.blocksAroundPlayer[x][z][y] = Blocks.bedrock;
          } else if(y > 1 && y < 64) {
            this.blocksAroundPlayer[x][z][y] = Blocks.rock;
          } else if(y == 64) {
            this.blocksAroundPlayer[x][z][y] = Blocks.dirt;
          } else {
            this.blocksAroundPlayer[x][z][y] = Blocks.air;
          }
        }
      }
    }
  }

  getBlock(x, y, z) {
    return this.blocksAroundPlayer[x][z][y];
  }

  setBlock(x, y, z, block) {
    this.blocksAroundPlayer[x][z][y] = block;
  }
}
