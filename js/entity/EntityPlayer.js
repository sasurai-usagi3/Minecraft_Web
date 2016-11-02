class EntityPlayer extends EntityCreature {
  constructor(targetWorld, posX, posY, posZ) {
    super(targetWorld, posX, posY, posZ);
    this.width = 0.6;
    this.height = 1.7;
    this.target = null;
    this.work = null;
  }

  update() {
    let getTargetBlockPos = (targetX, targetY, targetZ) => {
      let getPenetratingPosOnBlock = (blockPosX, blockPosY, blockPosZ) => {
        let result = [];
        let getPositionWhen = (axis, v) => {
          let t = 0;
          switch(axis) {
            case 0:
              t = (v - this.x) / this.sightX;
              return [v, this.y + 0.75 + t * this.sightY, this.z + t * this.sightZ];
            case 1:
              t = (v - this.y - 0.75) / this.sightY;
              return [this.x + t * this.sightX, v, this.z + t * this.sightZ];
            case 2:
              t = (v - this.z) / this.z;
              return [this.x + t * this.sightX, this.y + 0.75 + t * this.sightY, v];
            default:
              return null;
          }
        };
        result.push(getPositionWhen(1, blockPosY + 0.5));
        result.push(getPositionWhen(0, blockPosX + 0.5));
        result.push(getPositionWhen(2, blockPosZ + 0.5));
        result.push(getPositionWhen(0, blockPosX - 0.5));
        result.push(getPositionWhen(2, blockPosZ - 0.5));
        result.push(getPositionWhen(1, blockPosY - 0.5));

        return result.map(pos => (pos[0] >= blockPosX - 0.5 && pos[0] <= blockPosX + 0.5 && pos[1] >= blockPosY - 0.5  && pos[1] <= blockPosY + 0.5 && pos[2] >= blockPosZ - 0.5 && pos[2] <= blockPosZ + 0.5) ? pos : null);
      };    
      let pos = getPenetratingPosOnBlock(targetX, targetY, targetZ);
      let getDistance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));

      if(targetX < 0 || targetY < 0 || targetZ < 0) {
        return null;
      }

      if(getDistance([this.x, this.y + 0.75, this.z], [targetX, targetY, targetZ]) > 10) {
        return null;
      }

      if(this.world.getBlock(targetX, targetY, targetZ) != Blocks.air) {
        let side = null;
        if(pos[0] != null && this.sightY < 0) {
          side = 0;
        } else if(pos[1] != null && this.sightX < 0) {
          side = 1;
        } else if(pos[2] != null && this.sightZ < 0) {
          side = 2;
        } else if(pos[3] != null && this.sightX > 0) {
          side = 3;
        } else if(pos[4] != null && this.sightZ > 0) {
          side = 4;
        } else if(pos[5] != null && this.sightY > 0) {
          side = 5;
        }
        return [[targetX, targetY, targetZ], side];
      }
        
      if(pos[0] != null && this.sightY > 0) {
        return getTargetBlockPos(targetX, targetY + 1, targetZ);
      } else if(pos[1] != null && this.sightX > 0) {
        return getTargetBlockPos(targetX + 1, targetY, targetZ);
      } else if(pos[2] != null && this.sightZ > 0) {
        return getTargetBlockPos(targetX, targetY, targetZ + 1);
      } else if(pos[3] != null && this.sightX < 0) {
        return getTargetBlockPos(targetX - 1, targetY, targetZ);
      } else if(pos[4] != null && this.sightZ < 0) {
        return getTargetBlockPos(targetX, targetY, targetZ - 1);
      } else if(pos[5] != null && this.sightY < 0) {
        return getTargetBlockPos(targetX, targetY - 1, targetZ);
      }

      return null;
    }

    this.target = getTargetBlockPos(Math.floor(this.x), Math.floor(this.y + 0.75), Math.floor(this.z));
    super.update();
  } 

  getEyePos() {
    return [this.posX, this.posY + 0.75, this.posZ];
  }


  digBlock() {
  }

  putBlock() {
  }
}
