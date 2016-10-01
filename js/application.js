window.onload = () => {
  let [posX, posY, posZ] = [0, 64, 0];
  let [yaw, pitch] = [0, 0];
  let [sightX, sightY, sightZ] = [1, 0, 0];
  let [moveX, moveZ] = [1, 0];
  let renderer = new THREE.WebGLRenderer({antialias: true});
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(40, 800 / 480);
  let cube = new THREE.BoxGeometry(1, 1, 1);
  let light = new THREE.AmbientLight(0xffffff);
  let world = new World();
  let updateCanvas = () => {
    requestAnimationFrame(updateCanvas);

    camera.position.set(posX, posY + 1.6, posZ);
    camera.lookAt(new THREE.Vector3(posX + sightX, posY + 1.6 + sightY, posZ + sightZ));
    renderer.render(scene, camera);
  }
  
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);


  for(let x = 0; x < 16; ++x) {
    for(let z = 0; z < 16; ++z) {
      for(let y = 0; y < 256; ++y) {
        let block = new THREE.Mesh(cube, world.getBlock(x, y, z).getMaterial());

        block.position.set(x, y, z);
        scene.add(block);
      }
    }
  }

  scene.add(light);

  document.onkeydown = (e) => {
    if(e.keyCode == 87) {
      posX += 0.3 * moveX;
      posZ += 0.3 * moveZ;
    } else if(e.keyCode == 65) {
      posX += 0.3 * moveZ;
      posZ -= 0.3 * moveX;
    } else if(e.keyCode == 83) {
      posX -= 0.3 * moveX;
      posZ -= 0.3 * moveZ;
    } else if(e.keyCode == 68) {
      posX -= 0.3 * moveZ;
      posZ += 0.3 * moveX;
    } else if(e.keyCode == 32 && e.shiftKey) {
      posY -= 0.3;
    } else if(e.keyCode == 32) {
      posY += 0.3;
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

    [sightX, sightY, sightZ] = [Math.cos(radian * pitch) * Math.cos(radian * yaw), Math.sin(radian* pitch), Math.cos(radian * pitch) * Math.sin(radian * yaw)];
    [moveX, moveZ] = [Math.cos(radian * yaw), Math.sin(radian * yaw)];
  }

  updateCanvas(); 
}
