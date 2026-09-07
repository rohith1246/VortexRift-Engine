/**
 * BiomancyAggravateSynergy.js - Elemental Reaction & Synergy Resolver: biomancy -> Aggravate.
 */

class BiomancyAggravateSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'biomancy';
    this.reactionName = 'Aggravate';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 1.7;
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
      crowdControlEffect: 'aggravate_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { BiomancyAggravateSynergy };
