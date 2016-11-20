class Vector3D {
  constructor(p, q, r) {
    this.x = p;
    this.y = q;
    this.z = r;
  }

  add(v) {
    return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v) {
    return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mul(k) {
    return new Vector3D(k * this.x, k * this.y, k * this.z);
  }

  div(k) {
    return new Vector3D(this.x / k, this.y / k, this.z / k);
  }

  len() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
  }

  getDistanceTo(v) {
    return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z));
  }

  innerProduct(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  copy() {
    return new Vector3D(this.x, this.y, this.z);
  }
}
