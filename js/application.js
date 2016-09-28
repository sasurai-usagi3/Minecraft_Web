window.onload = function() {
  let posX = 0, posY = 0, posZ = 0;
  let yaw = 0, pitch = 0;
  let SightX = 1, SightY = 0, SightZ = 0;
  let moveX = 1, moveZ = 0;
  let renderer = new THREE.WebGLRenderer({antialias: true});
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(40, 800 / 480);
  let cube = new THREE.CubeGeometry(1, 1, 1);
  let light = new THREE.AmbientLight(0xffffff);
  let updateCanvas = function() {
    requestAnimationFrame(updateCanvas);

    camera.position.set(posX, posY + 1.6, posZ);
    camera.lookAt(new THREE.Vector3(posX + SightX, posY + 1.6 + SightY, posZ + SightZ));
    renderer.render(scene, camera);
  }
  
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);


  for(let x = -3; x <= 3; ++x) {
    for(let z = -3; z <= 3; ++z) {
      let meshDirt = new THREE.Mesh(cube, Blocks.dirt.getMaterial());
      let meshRock = new THREE.Mesh(cube, Blocks.rock.getMaterial());
      let meshBedrock = new THREE.Mesh(cube, Blocks.bedrock.getMaterial());

      meshDirt.position.set(x, 0, z);
      meshRock.position.set(x, -1, z);
      meshBedrock.position.set(x, -2, z);
      
      scene.add(meshDirt);
      scene.add(meshRock);
      scene.add(meshBedrock);
    }
  }

  scene.add(light);

  document.onkeydown = function(e) {
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

  document.onmousemove = function(e) {
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

    SightX = Math.cos(radian * pitch) * Math.cos(radian * yaw);
    SightY = Math.sin(radian* pitch);
    SightZ = Math.cos(radian * pitch) * Math.sin(radian * yaw);
    moveX = Math.cos(radian * yaw);
    moveZ = Math.sin(radian * yaw);
  }

  updateCanvas(); 
}
