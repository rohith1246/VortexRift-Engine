/**
 * ElectromancyCrystallizeSynergy.js - Elemental Reaction & Synergy Resolver: electromancy -> Crystallize.
 */

class ElectromancyCrystallizeSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'electromancy';
    this.reactionName = 'Crystallize';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.2;
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

module.exports = { ElectromancyCrystallizeSynergy };
