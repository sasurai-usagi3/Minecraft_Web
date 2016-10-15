window.onload = () => {
  let world = new World();
  let rendering = new Rendering("canvas_wrapper", world);
  let [yaw, pitch] = [0, 0];
  let [moveX, moveZ] = [1, 0];
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
    result.push(getPositionWhen(1, y));
    result.push(getPositionWhen(0, x + 1));
    result.push(getPositionWhen(2, z));
    result.push(getPositionWhen(0, x));
    result.push(getPositionWhen(2, z - 1));
    result.push(getPositionWhen(1, y - 1));

    return result.map(pos => (pos[0] >= x && pos[0] <= x + 1 && pos[1] >= y - 1 && pos[1] <= y && pos[2] >= z - 1 && pos[2] <= z) ? pos : null);
  }
    
  let getTargetBlockPos = (x, y, z) => {
    let pos = getPenetratingPosOnBlock(x, y, z);
    let getDistance = (a, b) => Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));

    if(x < 0 || y < 0 || z < 0) {
      return null;
    }

    if(getDistance([rendering.posX, rendering.posY, rendering.posZ], [x, y, z]) > 3) {
      return null;
    }

    if(world.getBlock(x, y, z) != Blocks.air) return [x, y, z];
        
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

    console.log(getTargetBlockPos(Math.floor(rendering.posX), Math.floor(rendering.posY + 1.6), Math.floor(rendering.posZ)));
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
    console.log(getTargetBlockPos(Math.floor(rendering.posX), Math.floor(rendering.posY + 1.6), Math.floor(rendering.posZ)));
  }

}
