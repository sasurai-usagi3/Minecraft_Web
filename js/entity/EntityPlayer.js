class EntityPlayer extends EntityCreature {
  constructor(targetWorld, posX, posY, posZ) {
    super(targetWorld, posX, posY, posZ);
    this.width = 0.6;
    this.height = 1.7;
  }

  getEyePos() {
    return [this.posX, this.posY + 0.75, this.posZ];
  }

  digBlock() {
  }

  putBlock() {
  }
}
