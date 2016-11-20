class CubeModel {
  constructor(center, width, depth, height) {
    this.x = center.x;
    this.y = center.y;
    this.z = center.z;
    this.w = width;
    this.d = depth;
    this.h = height;
  }

  getTopPenetratingPoint(o, p) {
    let y1 = this.y + this.h / 2;
    let k = (y1 - o.y) / p.y;
    let v = p.mul(k).add(o);
    v.y = y1;

    return (k >= 0 && Math.abs(v.x - this.x) <= this.w / 2 && Math.abs(v.z - this.z) <= this.d / 2) ? v : null;
  }

  getNorthPenetratingPoint(o, p) {
    let x1 = this.x + this.w / 2;
    let k = (x1 - o.x) / p.x;
    let v = p.mul(k).add(o);
    v.x = x1;

    return (k >= 0 && Math.abs(v.y - this.y) <= this.h / 2 && Math.abs(v.z - this.z) <= this.d / 2) ? v : null;
  }

  getWestPenetratingPoint(o, p) {
    let z1 = this.z + this.d / 2;
    let k = (z1 - o.z) / p.z;
    let v = p.mul(k).add(o);
    v.z = z1;

    return (k >= 0 && Math.abs(v.x - this.x) <= this.w / 2 && Math.abs(v.y - this.y) <= this.h / 2) ? v : null;
  }

  getSouthPenetratingPoint(o, p) {
    let x1 = this.x - this.w / 2;
    let k = (x1 - o.x) / p.x;
    let v = p.mul(k).add(o);
    v.x = x1;

    return (k >= 0 && Math.abs(v.y - this.y) <= this.h / 2 && Math.abs(v.z - this.z) <= this.d / 2) ? v : null;
  }

  getEastPenetratingPoint(o, p) {
    let z1 = this.z - this.d / 2;
    let k = (z1 - o.z) / p.z;
    let v = p.mul(k).add(o);
    v.z = z1;

    return (k >=0 && Math.abs(v.x - this.x) <= this.w / 2 && Math.abs(v.y - this.y) <= this.h / 2) ? v : null;
  }

  getBottomPenetratingPoint(o, p) {
    let y1 = this.y - this.h / 2;
    let k = (y1 - o.y) / p.y;
    let v = p.mul(k).add(o);
    v.y = y1;

    return (k >= 0 && Math.abs(v.x - this.x) <= this.w / 2 && Math.abs(v.z - this.z) <= this.d / 2) ? v : null;
  }

  getPenetratingPoints(o, p) {
    return [ 
      this.getTopPenetratingPoint(o, p),
      this.getNorthPenetratingPoint(o, p),
      this.getWestPenetratingPoint(o, p),
      this.getSouthPenetratingPoint(o, p),
      this.getEastPenetratingPoint(o, p),
      this.getBottomPenetratingPoint(o, p)
    ];
  }

  doseCollide(b) {
    let c1 = new Vector3D(this.x, this.y, this.z);
    let c2 = new Vector3D(b.x, b.y, b.z);
    let p = c2.sub(c1);
    let penetratingPoint1 = this.getPenetratingPoints(c1, p).filter(e => e != null)[0];
    let penetratingPoint2 = b.getPenetratingPoints(c2, p.mul(-1)).filter(e => e != null)[0];
    if(penetratingPoint1 == null || penetratingPoint2 == null) {
      return true;
    }
    let p1 = penetratingPoint1.sub(c1);
    let p2 = penetratingPoint2.sub(c2);

    return p.len() < p1.len() + p2.len();
  }
}
