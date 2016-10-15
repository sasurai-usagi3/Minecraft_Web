class Rendering {
  constructor(canvasId, targetWorld) {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 800 / 480);
    this.renderer.setSize(800, 480);
    this.renderer.setClearColor(0xffffff);
    this.meshes = [];
    this.world = targetWorld;
    document.getElementById(canvasId).appendChild(this.renderer.domElement);
    this.init();
    this.update();
  } 

  init() {
    let light = new THREE.AmbientLight(0xffffff);
    this.cube = new THREE.BoxGeometry(1, 1, 1);
    [this.posX, this.posY, this.posZ] = [0, 64, 0];
    [this.sightX, this.sightY, this.sightZ] = [1, 0, 0];
    this.scene.add(light);
    this.resetWorld();
  }

  resetWorld() {
    for(let x = 0; x < 16; ++x) {
      this.meshes[x] = [];
      for(let z = 0; z < 16; ++z) {
        this.meshes[x][z] = [];
        for(let y = 0; y < 256; ++y) {
          let block = new THREE.Mesh(this.cube, this.world.getBlock(x, y, z).getMaterial());

          block.position.set(x, y, z);
          this.meshes[x][z][y] = block;
          this.scene.add(block);
        }
      }
    }
  }
    
  update() {
    let update = () => {
      requestAnimationFrame(update);
      this.camera.position.set(this.posX, this.posY + 1.6, this.posZ);
      this.camera.lookAt(new THREE.Vector3(this.posX + this.sightX, this.posY + 1.6 + this.sightY, this.posZ + this.sightZ));
      this.renderer.render(this.scene, this.camera);
    };
    update();
  }

  move(deltaX, deltaY, deltaZ) {
    this.posX += deltaX;
    this.posY += deltaY;
    this.posZ += deltaZ;
  }

  moveTo(newX, newY, newZ) {
    [this.posX, this.posY, this.posZ] = [newX, newY, newZ];
  }

  rotate(x, y, z) {
    [this.sightX, this.sightY, this.sightZ] = [x, y, z];
  }

  updateMesh(x, y, z) {
    let block = new THREE.Mesh(this.cube, this.world.getBlock(x, y, z).getMaterial());
    
    block.position.set(x, y, z);
    this.scene.remove(this.meshes[x][z][y]);
    this.scene.add(block);
    this.meshes[x][z][y] = block;
  }

  showSelectedBlockMarker(x, y, z) {
    if(this.selectedBlockMarker != undefined) {
      this.scene.remove(this.selectedBlockMarker);
    }

    this.selectedBlockMarker = new THREE.EdgesHelper(this.meshes[x][z][y], 0x000000);
    this.scene.add(this.selectedBlockMarker);
  }

  removeSelectedBlockMarker() {
    if(this.selectedBlockMarker != undefined) {
      this.scene.remove(this.selectedBlockMarker);
    }
  }
}
