/**
 * CursedSepulcherCrucibleChamberGenerator.js - Procedural Dungeon Room Generator: CursedSepulcher -> CrucibleChamber.
 */

class CursedSepulcherCrucibleChamberGenerator {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.biome = 'CursedSepulcher';
    this.layout = 'CrucibleChamber';
    this.width = 20;
    this.height = 23;
    this.hazardDensity = 0.18;
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
            grid[y][x] = { tile: 'HAZARD', type: 'cursedsepulcher_trap', walkable: true };
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

module.exports = { CursedSepulcherCrucibleChamberGenerator };
