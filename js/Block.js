var Block = function(blockName) {
  var materials = [];

  for(var i = 0; i < 6; ++i) {
    var texture = new THREE.TextureLoader().load("/img/textures/blocks/" + blockName + "_" + i + ".png");
    materials.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: texture}));
  }
  this.name = blockName;
  this.material = new THREE.MultiMaterial(materials);
}

Block.prototype.getMaterial = function() {
  return this.material;
}
