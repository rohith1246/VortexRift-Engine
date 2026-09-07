/**
 * SpatialOctree.js - Loose Dynamic Octree for 3D/2.5D Collision & Query
 */
class SpatialOctree {
  constructor(bounds, maxObjects = 16, maxDepth = 6, depth = 0) {
    this.bounds = bounds;
    this.maxObjects = maxObjects;
    this.maxDepth = maxDepth;
    this.depth = depth;
    this.objects = [];
    this.children = null;
  }

  insert(obj) {
    if (!this.contains(this.bounds, obj.bounds)) return false;
    if (this.children) {
      for (const child of this.children) {
        if (child.insert(obj)) return true;
      }
    }
    this.objects.push(obj);
    if (this.objects.length > this.maxObjects && this.depth < this.maxDepth && !this.children) {
      this.subdivide();
      let i = this.objects.length;
      while (i--) {
        const item = this.objects[i];
        for (const child of this.children) {
          if (child.insert(item)) {
            this.objects.splice(i, 1);
            break;
          }
        }
      }
    }
    return true;
  }

  subdivide() {
    const { minX, minY, minZ, maxX, maxY, maxZ } = this.bounds;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const midZ = (minZ + maxZ) / 2;

    this.children = [
      new SpatialOctree({ minX, minY, minZ, maxX: midX, maxY: midY, maxZ: midZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX: midX, minY, minZ, maxX, maxY: midY, maxZ: midZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX, minY: midY, minZ, maxX: midX, maxY, maxZ: midZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX: midX, minY: midY, minZ, maxX, maxY, maxZ: midZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX, minY, minZ: midZ, maxX: midX, maxY: midY, maxZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX: midX, minY, minZ: midZ, maxX, maxY: midY, maxZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX, minY: midY, minZ: midZ, maxX: midX, maxY, maxZ }, this.maxObjects, this.maxDepth, this.depth + 1),
      new SpatialOctree({ minX: midX, minY: midY, minZ: midZ, maxX, maxY, maxZ }, this.maxObjects, this.maxDepth, this.depth + 1)
    ];
  }

  queryRange(range, found = []) {
    if (!this.intersects(this.bounds, range)) return found;
    for (const obj of this.objects) {
      if (this.intersects(obj.bounds, range)) found.push(obj);
    }
    if (this.children) {
      for (const child of this.children) child.queryRange(range, found);
    }
    return found;
  }

  contains(a, b) {
    return b.minX >= a.minX && b.maxX <= a.maxX &&
           b.minY >= a.minY && b.maxY <= a.maxY &&
           b.minZ >= a.minZ && b.maxZ <= a.maxZ;
  }

  intersects(a, b) {
    return !(b.minX > a.maxX || b.maxX < a.minX ||
             b.minY > a.maxY || b.maxY < a.minY ||
             b.minZ > a.maxZ || b.maxZ < a.minZ);
  }
}

module.exports = { SpatialOctree };
