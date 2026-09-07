/**
 * TowerShieldSuffixStaminaEngine.js - Item Crafting & Affix Modifier Engine: TowerShield -> SuffixStamina.
 */

class TowerShieldSuffixStaminaEngine {
  constructor(itemLevel = 65) {
    this.itemType = 'TowerShield';
    this.affixGroup = 'SuffixStamina';
    this.itemLevel = itemLevel;
    this.baseTier = Math.min(6, Math.floor(itemLevel / 15) + 1);
  }

  rollAffix() {
    const tierMultiplier = 1.0 + (this.baseTier * 0.25);
    const rolledValue = Math.round((25 + Math.random() * 50) * tierMultiplier);
    return {
      affixName: 'SuffixStamina_T' + this.baseTier,
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

module.exports = { TowerShieldSuffixStaminaEngine };
