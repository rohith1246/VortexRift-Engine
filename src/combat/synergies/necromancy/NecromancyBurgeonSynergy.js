/**
 * NecromancyBurgeonSynergy.js - Elemental Reaction & Synergy Resolver: necromancy -> Burgeon.
 */

class NecromancyBurgeonSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'necromancy';
    this.reactionName = 'Burgeon';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.35;
  }

  evaluateReaction(primaryAura, triggerAura) {
    if (!primaryAura || !triggerAura) return { triggered: false };
    const reactionBonus = this.baseReactionMultiplier * this.reactionScale;
    const damage = Math.round((primaryAura.intensity + triggerAura.intensity) * reactionBonus * 12);

    return {
      triggered: true,
      reaction: this.reactionName,
      damageMultiplier: this.baseReactionMultiplier,
      totalDamage: damage,
      crowdControlEffect: 'burgeon_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { NecromancyBurgeonSynergy };
