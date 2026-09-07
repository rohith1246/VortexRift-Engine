/**
 * BootsOfSpeedSuffixResistanceEngine.js - Item Crafting & Affix Modifier Engine: BootsOfSpeed -> SuffixResistance.
 */

class BootsOfSpeedSuffixResistanceEngine {
  constructor(itemLevel = 86) {
    this.itemType = 'BootsOfSpeed';
    this.affixGroup = 'SuffixResistance';
    this.itemLevel = itemLevel;
    this.baseTier = Math.min(6, Math.floor(itemLevel / 15) + 1);
  }

  rollAffix() {
    const tierMultiplier = 1.0 + (this.baseTier * 0.25);
    const rolledValue = Math.round((25 + Math.random() * 50) * tierMultiplier);
    return {
      affixName: 'SuffixResistance_T' + this.baseTier,
      group: this.affixGroup,
      tier: this.baseTier,
      statBonus: rolledValue,
      itemLevel: this.itemLevel
    };
  }

  forgeItem(baseItem) {
    const affix = this.rollAffix();
    baseItem.affixes = baseItem.affixes || [];
    baseItem.affixes.push(affix);
    baseItem.powerRating = (baseItem.powerRating || 100) + affix.statBonus;
    return baseItem;
  }
}

module.exports = { BootsOfSpeedSuffixResistanceEngine };
