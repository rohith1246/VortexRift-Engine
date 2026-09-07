/**
 * PyromancyQuickenSynergy.js - Elemental Reaction & Synergy Resolver: pyromancy -> Quicken.
 */

class PyromancyQuickenSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'pyromancy';
    this.reactionName = 'Quicken';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 1.9;
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

module.exports = { PyromancyQuickenSynergy };
