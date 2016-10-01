class BlockAir extends Block {
  constructor() {
    super("air");
  }

  setTextures() {
    this.material = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.003, transparent: true});
  }
}
