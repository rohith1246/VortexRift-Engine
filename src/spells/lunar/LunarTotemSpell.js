/**
 * LunarTotemSpell.js - Tactical Combat Spell Specification
 * School: lunar | Form: Totem
 */

class LunarTotemSpell {
  constructor(config = {}) {
    this.spellId = 'spell_lunar_totem';
    this.name = 'LunarTotem';
    this.school = 'lunar';
    this.form = 'Totem';
    this.tier = 4;
    this.baseManaCost = config.mana || 116;
    this.staminaCost = config.stamina || 21;
    this.cooldownTicks = config.cooldown || 20;
    this.currentCooldown = 0;
    this.baseDamage = config.damage || 296;
    this.projectileSpeed = 15;
    this.aoeRadius = 4.5;
    this.statusEffect = 'status_lunar_totem';
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

module.exports = { LunarTotemSpell };
