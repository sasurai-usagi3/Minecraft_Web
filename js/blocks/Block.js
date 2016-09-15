var Block = function(blockName) {
  this.name = blockName;
}

Block.prototype.registerTextures = function() {
}

Block.prototype.setTextures = function() {
  var texture = new THREE.TextureLoader().load("/img/textures/blocks/" + blockName + ".png");
  this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
}

Block.prototype.getMaterial = function() {
  return this.material;
}
