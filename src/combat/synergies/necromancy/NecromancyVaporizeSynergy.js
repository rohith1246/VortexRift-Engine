/**
 * NecromancyVaporizeSynergy.js - Elemental Reaction & Synergy Resolver: necromancy -> Vaporize.
 */

class NecromancyVaporizeSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'necromancy';
    this.reactionName = 'Vaporize';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.55;
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
      crowdControlEffect: 'vaporize_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { NecromancyVaporizeSynergy };
