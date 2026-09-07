/**
 * PyromancyOverloadSynergy.js - Elemental Reaction & Synergy Resolver: pyromancy -> Overload.
 */

class PyromancyOverloadSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'pyromancy';
    this.reactionName = 'Overload';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 1.5;
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
      crowdControlEffect: 'overload_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { PyromancyOverloadSynergy };
