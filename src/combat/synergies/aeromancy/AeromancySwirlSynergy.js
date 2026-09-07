/**
 * AeromancySwirlSynergy.js - Elemental Reaction & Synergy Resolver: aeromancy -> Swirl.
 */

class AeromancySwirlSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'aeromancy';
    this.reactionName = 'Swirl';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.1;
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
      crowdControlEffect: 'swirl_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { AeromancySwirlSynergy };
