/**
 * ElectromancyQuickenSynergy.js - Elemental Reaction & Synergy Resolver: electromancy -> Quicken.
 */

class ElectromancyQuickenSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'electromancy';
    this.reactionName = 'Quicken';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.4;
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
      crowdControlEffect: 'quicken_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { ElectromancyQuickenSynergy };
