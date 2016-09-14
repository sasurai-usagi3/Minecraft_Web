
var Block = function(block_name) {
  this.name = block_name;
  this.material = new THREE.MeshBasicMaterial({
    color: 0xbbbbbb
  });

  return this;
}

Block.prototype.getMaterial = function() {
  return this.material;
}
