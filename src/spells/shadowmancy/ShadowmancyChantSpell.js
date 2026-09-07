/**
 * ShadowmancyChantSpell.js - Tactical Combat Spell Specification
 * School: shadowmancy | Form: Chant
 */

class ShadowmancyChantSpell {
  constructor(config = {}) {
    this.spellId = 'spell_shadowmancy_chant';
    this.name = 'ShadowmancyChant';
    this.school = 'shadowmancy';
    this.form = 'Chant';
    this.tier = 1;
    this.baseManaCost = config.mana || 121;
    this.staminaCost = config.stamina || 15;
    this.cooldownTicks = config.cooldown || 20;
    this.currentCooldown = 0;
    this.baseDamage = config.damage || 317;
    this.projectileSpeed = 12;
    this.aoeRadius = 1.5;
    this.statusEffect = 'status_shadowmancy_chant';
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

module.exports = { ShadowmancyChantSpell };
