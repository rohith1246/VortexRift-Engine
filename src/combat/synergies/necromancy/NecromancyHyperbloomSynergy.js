/**
 * NecromancyHyperbloomSynergy.js - Elemental Reaction & Synergy Resolver: necromancy -> Hyperbloom.
 */

class NecromancyHyperbloomSynergy {
  constructor(reactionScale = 1.0) {
    this.primarySchool = 'necromancy';
    this.reactionName = 'Hyperbloom';
    this.reactionScale = reactionScale;
    this.baseReactionMultiplier = 2.25;
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
      crowdControlEffect: 'hyperbloom_stun_tick',
      remainingGauge: Math.max(0, primaryAura.gauge - triggerAura.gauge)
    };
  }
}

module.exports = { NecromancyHyperbloomSynergy };
