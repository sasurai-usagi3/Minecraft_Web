var BlockDirt = function() {
  Block.call(this, "dirt");
  Object.setPrototypeOf(BlockDirt.prototype, Block.prototype);

  this.textures = [];
}

BlockDirt.prototype.registerTextures = function() {
  for(var i = 0; i < 6; ++i) {
    var texture = new THREE.TextureLoader().load("/img/textures/blocks/" + this.name + "_" + i + ".png");
    this.textures.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: texture}));
  }
}

BlockDirt.prototype.setTextures = function() {
  this.material = new THREE.MultiMaterial(this.textures);
}
