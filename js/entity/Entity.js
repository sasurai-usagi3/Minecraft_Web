class Entity {
  constructor(targetWorld, posX, posY, posZ) {
    this.gravity = 9800;
    this.updateInterval = 1;
    this.needToUpdate = true;
    this.world = targetWorld;
    this.x = posX;
    this.y = posY;
    this.z = posZ;
    this.nextX = 0;
    this.nextY = 0;
    this.nextZ = 0;
    this.vx = 0;
    this.vy = 0;
    this.vz = 0;
    this.width = 0;
    this.height = 0;

    this.update();
  }

  update() {
    if(this.needToUpdate) {
      this.nextX = this.x + this.vx * this.updateInterval / 1000;
      this.nextY = (this.isOnGround()) ? this.y : this.y + this.vy * this.updateInterval / 1000;
      this.nextZ = this.z + this.vz * this.updateInterval / 1000;
      this.vy -= this.gravity * this.updateInterval / 1000;
    
      if(this.canMove()) {
        this.x = this.nextX;
        this.y = this.nextY;
        this.z = this.nextZ;
      } else {
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
      }
    }
    setTimeout(() => this.update(), this.updateInterval);
  }

  canMove() {
    let diag = Math.sqrt(2) * this.width / 2;
    let entityModel = this.getBoundaryBox();

    for(let x = Math.round(this.nextX - diag); x < Math.round(this.nextX + diag); ++x) {
      for(let z = Math.round(this.nextZ - diag); z < Math.round(this.nextZ + diag); ++z) {
        for(let y = Math.round(this.nextY - this.height / 2); y < Math.round(this.nextY + this.height / 2); ++y) {
          let block = this.world.getBlock(x, y, z);
          if(block != null && block != Blocks.air && entityModel.doseCollide(block.getBoundaryBox(x, y, z))) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isOnGround() {
    let block = this.world.getBlock(Math.round(this.x), Math.round(this.y - this.height / 2) - 1, Math.round(this.z));
    return block != null && block != Blocks.air;
  }

  getBoundaryBox() {
    return new CubeModel(new Vector3D(this.x, this.y, this.z), this.width, this.width, this.height);
  }
}
