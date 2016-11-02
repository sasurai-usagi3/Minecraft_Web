class EntityCreature extends Entity {
  constructor(posX, posY, posZ) {
    super(posX, posY, posZ);
    this.pitch = 0;
    this.yaw = 0
  }

  walk(direction) {
    const radian = Math.PI / 180;
    let moveX = Math.cos(radian * this.yaw), moveZ = Math.sin(radian * this.pitch);
    
    if(direction == 0) {
      this.vx = moveX;
      this.vz = moveZ;
    } else if(direction == 1) {
      this.vx = -moveZ;
      this.vz = moveX;
    } else if(direction == 2) {
      this.vx = -moveX;
      this.vz = -moveZ;
    } else if(direction == 3) {
      this.vx = moveZ;
      this.vz = -moveX;
    }
  }

  stop() {
    this.vx = 0;
    this.vz = 0;
  }

  jump() {
    if(this.isOnGround()) {
      this.vy = 10;
    }
  }

  fly(direction) {
    if(direction == 0) {
      this.posY += 0.3;
    } else if(direction == 1) {
      this.posY -= 0.3;
    }
  }

  rotate(deltaYaw, deltaPitch) {
    this.yaw += deltaYaw;
    this.pitch -= deltaPitch;
    if(this.pitch > 90) {
      this.pitch = 90;
    } else if(this.pitch < -90) {
      this.pitch = -90;
    }
  }

  isOnGround() {
    return true;
  }
}
    
