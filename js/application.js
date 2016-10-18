window.onload = () => {
  let world = new World();
  let rendering = new Rendering("canvas_wrapper", world);
  let [yaw, pitch] = [0, 0];
  let [moveX, moveZ] = [1, 0];
  let targetBlockPos = null;
  let targetBlockSide = null;
  let thePlayerWork = null;
  let getPositionWhen = (axis, v) => {
    let t = 0;
    switch(axis) {
      case 0:
        t = (v - rendering.posX) / rendering.sightX;
        return [v, rendering.posY + 1.6 + t * rendering.sightY, rendering.posZ + t * rendering.sightZ];
      case 1:
        t = (v - rendering.posY - 1.6) / rendering.sightY;
        return [rendering.posX + t * rendering.sightX, v, rendering.posZ + t * rendering.sightZ];
      case 2:
        t = (v - rendering.posZ) / rendering.sightZ;
        return [rendering.posX + t * rendering.sightX, rendering.posY + 1.6 + t * rendering.sightY, v];
      default:
        return null;
    }
  }
  let getPenetratingPosOnBlock = (x, y, z) => {
    let result = [];
    result.push(getPositionWhen(1, y + 0.5));
    result.push(getPositionWhen(0, x + 0.5));
    result.push(getPositionWhen(2, z + 0.5));
    result.push(getPositionWhen(0, x - 0.5));
    result.push(getPositionWhen(2, z - 0.5));
    result.push(getPositionWhen(1, y - 0.5));

    return result.map(pos => (pos[0] >= x - 0.5 && pos[0] <= x + 0.5 && pos[1] >= y - 0.5  && pos[1] <= y + 0.5 && pos[2] >= z - 0.5 && pos[2] <= z + 0.5) ? pos : null);
  }    
  let getTargetBlockPos = (x, y, z) => {
    let pos = getPenetratingPosOnBlock(x, y, z);
    let getDistance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));

    if(x < 0 || y < 0 || z < 0) {
      return null;
    }

    if(getDistance([rendering.posX, rendering.posY + 1.6, rendering.posZ], [x, y, z]) > 10) {
      return null;
    }

    if(world.getBlock(x, y, z) != Blocks.air) {
      let side = null;
      if(pos[0] != null && rendering.sightY < 0) {
        side = 0;
      } else if(pos[1] != null && rendering.sightX < 0) {
        side = 1;
      } else if(pos[2] != null && rendering.sightZ < 0) {
        side = 2;
      } else if(pos[3] != null && rendering.sightX > 0) {
        side = 3;
      } else if(pos[4] != null && rendering.sightZ > 0) {
        side = 4;
      } else if(pos[5] != null && rendering.sightY > 0) {
        side = 5;
      }
      return [[x, y, z], side];
    }
        
    if(pos[0] != null && rendering.sightY > 0) {
      return getTargetBlockPos(x, y + 1, z);
    } else if(pos[1] != null && rendering.sightX > 0) {
      return getTargetBlockPos(x + 1, y, z);
    } else if(pos[2] != null && rendering.sightZ > 0) {
      return getTargetBlockPos(x, y, z + 1);
    } else if(pos[3] != null && rendering.sightX < 0) {
      return getTargetBlockPos(x - 1, y, z);
    } else if(pos[4] != null && rendering.sightZ < 0) {
      return getTargetBlockPos(x, y, z - 1);
    } else if(pos[5] != null && rendering.sightY < 0) {
      return getTargetBlockPos(x, y - 1, z);
    }

    return null;
  }
  let setMarker = (info) => {
    let pos = (info != null) ? info[0] : null;
    let side = (info != null) ? info[1] : null;

    if(info != null) {
      rendering.showSelectedBlockMarker(pos[0], pos[1], pos[2]);
      targetBlockPos = [pos[0], pos[1], pos[2]];
      targetBlockSide = side;
      if(thePlayerWork == 0) {
        world.setBlock(pos[0], pos[1], pos[2], Blocks.air);
        rendering.updateMesh(pos[0], pos[1], pos[2]);
      } else if(thePlayerWork == 1) {
        switch(side) {
          case 0:
            pos[1] += 1;
            break;
          case 1:
            pos[0] += 1;
            break;
          case 2:
            pos[2] += 1;
            break;
          case 3:
            pos[0] -= 1;
            break;
          case 4:
            pos[2] -= 1;
            break;
          case 5:
            pos[1] -= 1;
            break;
        }
        world.setBlock(pos[0], pos[1], pos[2], Blocks.dirt);
        rendering.updateMesh(pos[0], pos[1], pos[2]);
      }
    } else {
      rendering.removeSelectedBlockMarker();
      targetBlockPos = null;
      tatgetBlockside = null;
    }
  }

  document.onkeydown = (e) => {
    if(e.keyCode == 87) {
      rendering.move(0.3 * moveX, 0, 0.3 * moveZ);
    } else if(e.keyCode == 65) {
      rendering.move(0.3 * moveZ, 0, -0.3 * moveX);
    } else if(e.keyCode == 83) {
      rendering.move(-0.3 * moveX, 0, -0.3 * moveZ);
    } else if(e.keyCode == 68) {
      rendering.move(-0.3 * moveZ, 0, 0.3 * moveX);
    } else if(e.keyCode == 32 && e.shiftKey) {
      rendering.move(0, -0.3, 0);
    } else if(e.keyCode == 32) {
      rendering.move(0, 0.3, 0);
    }

    setMarker(getTargetBlockPos(Math.floor(rendering.posX), Math.floor(rendering.posY + 1.6), Math.floor(rendering.posZ)));
  }

  document.onmousemove = (e) => {
    let deltaX = e.momentX || e.webkitMovementX || e.mozMovementX || e.movementX;
    let deltaY = e.momentY || e.webkitMovementY || e.mozMovementY || e.movementY;
    const radian = Math.PI / 180;

    yaw += deltaX / 0.8;
    pitch -= deltaY / 0.8;

    if(pitch > 90) {
      pitch = 90;
    } else if(pitch < -90) {
      pitch = -90;
    }

    rendering.rotate(Math.cos(radian * pitch) * Math.cos(radian * yaw), Math.sin(radian* pitch), Math.cos(radian * pitch) * Math.sin(radian * yaw));
    [moveX, moveZ] = [Math.cos(radian * yaw), Math.sin(radian * yaw)];
    setMarker(getTargetBlockPos(Math.floor(rendering.posX), Math.floor(rendering.posY + 1.6), Math.floor(rendering.posZ)));
  }

  document.onmousedown = (e) => {
    if(e.buttons == 1) {
      thePlayerWork = 0;
      if(targetBlockPos != null) {
        world.setBlock(targetBlockPos[0], targetBlockPos[1], targetBlockPos[2], Blocks.air);
        rendering.updateMesh(targetBlockPos[0], targetBlockPos[1], targetBlockPos[2]);
      }
    } else if(e.buttons == 2) {
      thePlayerWork = 1;
      if(targetBlockPos != null) {
        let pos = [targetBlockPos[0], targetBlockPos[1], targetBlockPos[2]];
        switch(targetBlockSide) {
          case 0:
            pos[1] += 1;
            break;
          case 1:
            pos[0] += 1;
            break;
          case 2:
            pos[2] += 1;
            break;
          case 3:
            pos[0] -= 1;
            break;
          case 4:
            pos[2] -= 1;
            break;
          case 5:
            pos[1] -= 1;
            break;
        }
        world.setBlock(pos[0], pos[1], pos[2], Blocks.dirt);
        rendering.updateMesh(pos[0], pos[1], pos[2]);
      }
    }
  }

  document.oncontextmenu = () => {
    return false;
  }

  document.onmouseup = () => {
    thePlayerWork = null;
  }
}
