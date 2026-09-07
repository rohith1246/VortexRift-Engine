/**
 * BiomancyBloomSynergy.js - Elemental Reaction & Synergy Resolver: biomancy -> Bloom.
 */

class BiomancyBloomSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'biomancy';
    this.reactionName = 'Bloom';
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
      crowdControlEffect: 'bloom_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { BiomancyBloomSynergy };
