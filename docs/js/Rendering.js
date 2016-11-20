class Rendering {
  constructor(targetWorld, targetPlayer) {
    let light = new THREE.AmbientLight(0xffffff);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 800 / 480);
    this.renderer.setSize(800, 480);
    this.renderer.setClearColor(0xffffff);
    this.meshes = [];
    this.world = targetWorld;
    this.player = targetPlayer;
    this.cube = new THREE.BoxGeometry(1, 1, 1);
    this.scene.add(light);
    this.update();
  } 

  init(canvasId) {
    document.getElementById(canvasId).appendChild(this.renderer.domElement);
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
      let [cameraX, cameraY, cameraZ] = this.player.getEyeSight();
      requestAnimationFrame(update);
      this.camera.position.set(this.player.x, this.player.y + 0.75, this.player.z);
      this.camera.lookAt(new THREE.Vector3(this.player.x + cameraX, this.player.y + cameraY + 0.75, this.player.z + cameraZ));
      if(this.player.target != null) {
        let info = this.player.target;
        let pos = (info != null) ? info[0] : null;
        let side = (info != null) ? info[1] : null;
        this.showSelectedBlockMarker(pos[0], pos[1], pos[2]);
      } else {
        this.removeSelectedBlockMarker();
      }
      this.renderer.render(this.scene, this.camera);
    };
    update();
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
