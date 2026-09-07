/**
 * BrimstonePitLootVaultGenerator.js - Procedural Dungeon Room Generator: BrimstonePit -> LootVault.
 */

class BrimstonePitLootVaultGenerator {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.biome = 'BrimstonePit';
    this.layout = 'LootVault';
    this.width = 28;
    this.height = 26;
    this.hazardDensity = 0.14;
  }

  generate() {
    const grid = Array.from({ length: this.height }, () => Array(this.width).fill(0));
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
          grid[y][x] = { tile: 'WALL', walkable: false, cover: 'FULL' };
        } else {
          const rand = Math.random();
          if (rand < this.hazardDensity) {
            grid[y][x] = { tile: 'HAZARD', type: 'brimstonepit_trap', walkable: true };
          } else if (rand < this.hazardDensity + 0.1) {
            grid[y][x] = { tile: 'PILLAR', walkable: false, cover: 'HALF' };
          } else {
            grid[y][x] = { tile: 'FLOOR', walkable: true, cover: 'NONE' };
          }
        }
      }
    }
    return { biome: this.biome, layout: this.layout, dimensions: { w: this.width, h: this.height }, tiles: grid };
  }
}

module.exports = { BrimstonePitLootVaultGenerator };
