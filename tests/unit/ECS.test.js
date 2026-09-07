const { EntityManager } = require('../../src/core/ecs/EntityManager');
describe('EntityManager Bitmask ECS', () => {
  test('creates and queries entities with bitmasks', () => {
    const em = new EntityManager();
    em.registerComponent('Pos', 0);
    em.registerComponent('Vel', 1);
    const id = em.createEntity();
    em.addComponent(id, 'Pos', { x: 10, y: 20 });
    const res = em.queryEntities(1n);
    expect(res.includes(id)).toBe(true);
  });
});