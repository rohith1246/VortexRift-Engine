/**
 * CryomancyBloomSynergy.js - Elemental Reaction & Synergy Resolver: cryomancy -> Bloom.
 */

class CryomancyBloomSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'cryomancy';
    this.reactionName = 'Bloom';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.15;
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

module.exports = { CryomancyBloomSynergy };
