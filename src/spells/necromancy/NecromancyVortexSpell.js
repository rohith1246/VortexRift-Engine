/**
 * NecromancyVortexSpell.js - Tactical Combat Spell Specification
 * School: necromancy | Form: Vortex
 */

class NecromancyVortexSpell {
  constructor(config = {}) {
    this.spellId = 'spell_necromancy_vortex';
    this.name = 'NecromancyVortex';
    this.school = 'necromancy';
    this.form = 'Vortex';
    this.tier = 2;
    this.baseManaCost = config.mana || 55;
    this.staminaCost = config.stamina || 27;
    this.cooldownTicks = config.cooldown || 10;
    this.currentCooldown = 0;
    this.baseDamage = config.damage || 146;
    this.projectileSpeed = 27;
    this.aoeRadius = 2.5;
    this.statusEffect = 'status_necromancy_vortex';
    this.critChance = 0.12 + (sIdx * 0.01);
  }

  isReady() {
    return this.currentCooldown === 0;
  }

  tick() {
    if (this.currentCooldown > 0) this.currentCooldown--;
  }

  cast(caster, targetPos, spatialOctree) {
    if (!this.isReady()) return { castSuccess: false, reason: 'Cooldown active' };
    if (caster.mana < this.baseManaCost) return { castSuccess: false, reason: 'Mana depleted' };

    caster.mana -= this.baseManaCost;
    this.currentCooldown = this.cooldownTicks;

    const hits = spatialOctree.queryRange({
      minX: targetPos.x - this.aoeRadius, maxX: targetPos.x + this.aoeRadius,
      minY: targetPos.y - this.aoeRadius, maxY: targetPos.y + this.aoeRadius,
      minZ: 0, maxZ: 10
    });

    const damageResults = hits.map(entity => {
      const isCrit = Math.random() < this.critChance;
      const dmg = isCrit ? Math.round(this.baseDamage * 1.75) : this.baseDamage;
      if (entity.applyDamage) entity.applyDamage(dmg, this.school);
      return { entityId: entity.id, damageDealt: dmg, isCrit, statusInflicted: this.statusEffect };
    });

    return {
      castSuccess: true,
      spell: this.name,
      casterId: caster.id,
      coordinates: targetPos,
      affectedCount: damageResults.length,
      hits: damageResults
    };
  }
}

module.exports = { NecromancyVortexSpell };
