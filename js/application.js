window.onload = () => {
  let world = new World();
  let rendering = new Rendering("canvas_wrapper", world);
  let [posX, posY, posZ] = [0, 64, 0];
  let [yaw, pitch] = [0, 0];
  let [sightX, sightY, sightZ] = [1, 0, 0];
  let [moveX, moveZ] = [1, 0];

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
  }

}
