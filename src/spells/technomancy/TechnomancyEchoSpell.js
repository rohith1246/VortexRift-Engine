/**
 * TechnomancyEchoSpell.js - Tactical Combat Spell Specification
 * School: technomancy | Form: Echo
 */

class TechnomancyEchoSpell {
  constructor(config = {}) {
    this.spellId = 'spell_technomancy_echo';
    this.name = 'TechnomancyEcho';
    this.school = 'technomancy';
    this.form = 'Echo';
    this.tier = 1;
    this.baseManaCost = config.mana || 94;
    this.staminaCost = config.stamina || 27;
    this.cooldownTicks = config.cooldown || 25;
    this.currentCooldown = 0;
    this.baseDamage = config.damage || 245;
    this.projectileSpeed = 18;
    this.aoeRadius = 1.5;
    this.statusEffect = 'status_technomancy_echo';
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

module.exports = { TechnomancyEchoSpell };
