class Entity {
  constructor(targetWorld, posX, posY, posZ) {
    this.gravity = 9.8;
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
    if(true) {
      this.nextX += this.vx * this.updateInterval / 1000;
      this.nextY += this.vy * this.updateInterval / 1000;
      this.nextZ += this.vz * this.updateInterval / 1000;
      this.vy -= this.gravity * this.updateInterval / 1000;
    
      if(this.canMove()) {
        this.x = this.nextX;
        this.y = this.nextY;
        this.z = this.nextZ;
      }
    }
    setTimeout(() => this.update(), this.updateInterval);
  }

  canMove() {
    return true;
  }

  isOnGround() {
    return true;
  }
}
