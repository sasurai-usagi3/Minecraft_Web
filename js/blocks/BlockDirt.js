class BlockDirt extends Block {
  constructor() {
    super("dirt");
    this.textures = [];
  }

  registerTextures() {
    for(let i = 0; i < 6; ++i) {
      let texture = new THREE.TextureLoader().load("/img/textures/blocks/" + this.name + "_" + i + ".png");
      this.textures.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: texture}));
    }
  }

  setTextures() {
    this.material = new THREE.MultiMaterial(this.textures);
  }
}
