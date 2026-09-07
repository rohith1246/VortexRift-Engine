/**
 * GeomancyVaporizeSynergy.js - Elemental Reaction & Synergy Resolver: geomancy -> Vaporize.
 */

class GeomancyVaporizeSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'geomancy';
    this.reactionName = 'Vaporize';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.05;
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

module.exports = { GeomancyVaporizeSynergy };
