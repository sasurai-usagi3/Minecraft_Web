window.onload = function() {
  var renderer = new THREE.WebGLRenderer({antialias: true});
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 800 / 480);
  var cube = new THREE.CubeGeometry(1, 1, 1);
  var dirt = new BlockDirt();
  var mesh = new THREE.Mesh(cube, dirt.getMaterial());
  var light = new THREE.AmbientLight(0xffffff);
  var updateCanvas = function() {
    requestAnimationFrame(updateCanvas);
    renderer.render(scene, camera);
  }
  
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);

  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(1, 0, 0));

  mesh.position.set(5, 0, 0);
  scene.add(mesh);

  scene.add(light);

  updateCanvas(); 
}
