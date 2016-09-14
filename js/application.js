window.onload = function() {
  var renderer = new THREE.WebGLRenderer({antialias: true});
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(40, 800 / 480);
  var cube = new THREE.CubeGeometry(1, 1, 1);
  var material = new THREE.MeshPhongMaterial({color: 0x965200});
  var mesh = new THREE.Mesh(cube, material);
  
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);

  camera.position.set(0, 0, 0);
  camera.lookAt(new THREE.Vector3(1, 0, 0));

  mesh.position.set(5, 0, 0);
  scene.add(mesh);

  var light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  renderer.render(scene, camera);
}
