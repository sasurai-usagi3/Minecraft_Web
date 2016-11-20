class Block {
  constructor(blockName) {
    this.name = blockName;
  }

  registerTextures() {
  }

  setTextures() {
    let texture = new THREE.TextureLoader().load(`/img/textures/blocks/${this.name}.png`);
    this.material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
  }

  getMaterial() {
    return this.material;
  }

  getBoundaryBox(x, y, z) {
    return new CubeModel(new Vector3D(x, y, z), 1, 1, 1); 
  }
}
