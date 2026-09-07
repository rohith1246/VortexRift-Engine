const { SpatialOctree } = require('../../src/physics/SpatialOctree');
describe('SpatialOctree Dynamic Partitioning', () => {
  test('inserts and queries bounding volumes', () => {
    const oct = new SpatialOctree({ minX: 0, minY: 0, minZ: 0, maxX: 100, maxY: 100, maxZ: 100 });
    oct.insert({ bounds: { minX: 10, minY: 10, minZ: 10, maxX: 20, maxY: 20, maxZ: 20 }, id: 'box1' });
    const hits = oct.queryRange({ minX: 5, minY: 5, minZ: 5, maxX: 25, maxY: 25, maxZ: 25 });
    expect(hits.length).toBe(1);
  });
});