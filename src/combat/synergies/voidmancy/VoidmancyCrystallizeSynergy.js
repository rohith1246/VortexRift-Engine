/**
 * VoidmancyCrystallizeSynergy.js - Elemental Reaction & Synergy Resolver: voidmancy -> Crystallize.
 */

class VoidmancyCrystallizeSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'voidmancy';
    this.reactionName = 'Crystallize';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.45;
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
      crowdControlEffect: 'crystallize_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { VoidmancyCrystallizeSynergy };
