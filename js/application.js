window.onload = function() {
  var renderer = new THREE.WebGLRenderer({antialias: true});
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 800 / 480);
  var cube = new THREE.CubeGeometry(1, 1, 1);
  var light = new THREE.AmbientLight(0xffffff);
  var updateCanvas = function() {
    requestAnimationFrame(updateCanvas);
    renderer.render(scene, camera);
  }
  
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);

  camera.position.set(0, 4, 15);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  for(var x = -3; x <= 3; ++x) {
    for(var z = -3; z <= 3; ++z) {
      var meshDirt = new THREE.Mesh(cube, Blocks.dirt.getMaterial());
      var meshRock = new THREE.Mesh(cube, Blocks.rock.getMaterial());
      var meshBedrock = new THREE.Mesh(cube, Blocks.bedrock.getMaterial());

      meshDirt.position.set(x, 0, z);
      meshRock.position.set(x, -1, z);
      meshBedrock.position.set(x, -2, z);
      
      scene.add(meshDirt);
      scene.add(meshRock);
      scene.add(meshBedrock);
    }
  }

  scene.add(light);

  updateCanvas(); 
}
