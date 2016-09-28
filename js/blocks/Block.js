class Block {
  constructor(blockName) {
    this.name = blockName;
  }

  registerTextures() {
  }

  setTextures() {
    var texture = new THREE.TextureLoader().load("/img/textures/blocks/" + blockName + ".png");
    this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
  }

  getMaterial() {
    return this.material;
  }
}
