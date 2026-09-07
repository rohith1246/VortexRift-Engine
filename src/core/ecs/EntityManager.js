/**
 * EntityManager.js - 64-bit Bitmask & Sparse-Set Entity Component System
 */
class EntityManager {
  constructor(initialCapacity = 10000) {
    this.capacity = initialCapacity;
    this.nextEntityId = 1;
    this.recycledIds = [];
    this.entityMasks = new BigUint64Array(initialCapacity);
    this.components = new Map();
    this.systems = [];
  }

  createEntity() {
    const id = this.recycledIds.length > 0 ? this.recycledIds.pop() : this.nextEntityId++;
    if (id >= this.capacity) this.growCapacity();
    this.entityMasks[id] = 0n;
    return id;
  }

  destroyEntity(id) {
    this.entityMasks[id] = 0n;
    for (const [_, compStore] of this.components) {
      compStore.delete(id);
    }
    this.recycledIds.push(id);
  }

  registerComponent(componentName, bitIndex) {
    const bitMask = 1n << BigInt(bitIndex);
    this.components.set(componentName, { bitMask, data: new Map() });
  }

  addComponent(entityId, componentName, data) {
    const comp = this.components.get(componentName);
    if (!comp) throw new Error(`Unregistered component: ${componentName}`);
    this.entityMasks[entityId] |= comp.bitMask;
    comp.data.set(entityId, data);
  }

  getComponent(entityId, componentName) {
    const comp = this.components.get(componentName);
    return comp ? comp.data.get(entityId) : null;
  }

  queryEntities(requiredMask) {
    const matching = [];
    for (let id = 1; id < this.nextEntityId; id++) {
      if ((this.entityMasks[id] & requiredMask) === requiredMask) {
        matching.push(id);
      }
    }
    return matching;
  }

  growCapacity() {
    this.capacity *= 2;
    const newMasks = new BigUint64Array(this.capacity);
    newMasks.set(this.entityMasks);
    this.entityMasks = newMasks;
  }
}

module.exports = { EntityManager };
