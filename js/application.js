let world = new World();
let player = new EntityPlayer(world, 0, 64.85, 0);
let rendering = new Rendering(world, player);
let mouseButtons = 0;
let destroyOrPutBlock = (mode) => {
  if(mode == 1) {
    let blockPos = player.destroyBlock();
    if(blockPos != null) {
      rendering.updateMesh(blockPos[0], blockPos[1], blockPos[2]);
    } 
  } else if(mode == 2) {
    let blockPos = player.putBlock();
    if(blockPos != null) {
      rendering.updateMesh(blockPos[0], blockPos[1], blockPos[2]);
    } 
  }
};

player.gravity = 0;
player.vy = 0

window.addEventListener("keydown", (e) => {
  if(e.keyCode == 87) {
    player.walk(0);
  } else if(e.keyCode == 68) {
    player.walk(1);
  } else if(e.keyCode == 83) {
    player.walk(2);
  } else if(e.keyCode == 65) {
    player.walk(3);
  }

  if(e.keyCode == 32 && e.shiftKey) {
    player.fly(1);
  } else if(e.keyCode == 32) {
    player.fly(0);
  }
  
  destroyOrPutBlock(mouseButtons);
});

window.addEventListener("keyup", (e) => {
  if(e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 65) {
    player.stop();
  }
});

window.addEventListener("mousemove", (e) => {
  let deltaX = e.momentX || e.webkitMovementX || e.mozMovementX || e.movementX;
  let deltaY = e.momentY || e.webkitMovementY || e.mozMovementY || e.movementY;

  player.rotate(deltaX / 0.8, deltaY / 0.8);
  destroyOrPutBlock(mouseButtons);
});

window.addEventListener("mousedown", (e) => {
  mouseButtons = e.buttons;
  destroyOrPutBlock(mouseButtons);
});

window.addEventListener("mouseup", () => {
  mouseButtons = 0;
});

window.addEventListener("load", () => {
  rendering.init("canvas_wrapper");
});

window.oncontextmenu = () => false;
