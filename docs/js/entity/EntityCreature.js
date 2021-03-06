class EntityCreature extends Entity {
  constructor(targetWorld, posX, posY, posZ) {
    super(targetWorld, posX, posY, posZ);
    this.pitch = 0;
    this.yaw = 0
    this.sightX = 1;
    this.sightY = 0;
    this.sightZ = 0;
  }

  walk(direction) {
    const radian = Math.PI / 180;
    let moveX = 50 * Math.cos(radian * this.yaw), moveZ = 50 * Math.sin(radian * this.yaw);
    
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
      this.y += 0.3;
    } else if(direction == 1) {
      this.y -= 0.3;
    }
  }

  rotate(deltaYaw, deltaPitch) {
    const radian = Math.PI / 180;
    this.yaw += deltaYaw;
    this.pitch -= deltaPitch;
    if(this.pitch > 90) {
      this.pitch = 90;
    } else if(this.pitch < -90) {
      this.pitch = -90;
    }
    this.sightX = Math.cos(radian * this.pitch) * Math.cos(radian * this.yaw);
    this.sightY = Math.sin(radian * this.pitch);
    this.sightZ = Math.cos(radian * this.pitch) * Math.sin(radian * this.yaw);
  }

  getEyeSight() {
    return [this.sightX, this.sightY, this.sightZ];
  }
}
