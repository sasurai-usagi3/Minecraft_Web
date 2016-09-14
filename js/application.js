window.onload = function() {
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(800, 480);
  renderer.setClearColor(0xffffff);
  document.getElementById("canvas_wrapper").appendChild(renderer.domElement);
}
