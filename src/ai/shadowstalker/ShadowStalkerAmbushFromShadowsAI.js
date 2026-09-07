/**
 * ShadowStalkerAmbushFromShadowsAI.js - Monster Behavior Tree Controller: ShadowStalker with AmbushFromShadows strategy.
 */

class ShadowStalkerAmbushFromShadowsAI {
  constructor(entity, blackboard = {}) {
    this.entity = entity;
    this.blackboard = blackboard;
    this.monsterType = 'ShadowStalker';
    this.behaviorName = 'AmbushFromShadows';
    this.aggroRadius = 27;
    this.attackRange = 4;
    this.threatMap = new Map();
  }

  evaluateState(gameState) {
    const nearbyTargets = gameState.getEntitiesWithin(this.entity.pos, this.aggroRadius);
    if (nearbyTargets.length === 0) return { decision: 'PATROL', urgency: 0.1 };

    const primaryTarget = this.selectHighestThreat(nearbyTargets);
    const dist = gameState.getDistance(this.entity.pos, primaryTarget.pos);

    if (this.entity.health / this.entity.maxHealth < 0.25) {
      return { decision: 'ENRAGE_OR_RETREAT', target: primaryTarget, urgency: 0.95 };
    }

    if (dist <= this.attackRange) {
      return { decision: 'EXECUTE_ATTACK', target: primaryTarget, urgency: 0.85 };
    }

    return { decision: 'PURSUE_TARGET', target: primaryTarget, urgency: 0.65 };
  }

  selectHighestThreat(targets) {
    return targets.sort((a, b) => (this.threatMap.get(b.id) || 0) - (this.threatMap.get(a.id) || 0))[0];
  }

  tick(gameState) {
    const state = this.evaluateState(gameState);
    switch (state.decision) {
      case 'EXECUTE_ATTACK':
        return this.entity.attack(state.target);
      case 'PURSUE_TARGET':
        return this.entity.navigateTowards(state.target.pos);
      case 'ENRAGE_OR_RETREAT':
        return this.entity.activateEnrage();
      default:
        return this.entity.patrol();
    }
  }
}

module.exports = { ShadowStalkerAmbushFromShadowsAI };
