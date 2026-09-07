/**
 * CryomancyAggravateSynergy.js - Elemental Reaction & Synergy Resolver: cryomancy -> Aggravate.
 */

class CryomancyAggravateSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'cryomancy';
    this.reactionName = 'Aggravate';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 1.95;
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

module.exports = { CryomancyAggravateSynergy };
