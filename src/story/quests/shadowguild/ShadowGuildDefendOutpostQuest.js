/**
 * ShadowGuildDefendOutpostQuest.js - Dynamic Quest FSM Controller: ShadowGuild -> DefendOutpost.
 */

class ShadowGuildDefendOutpostQuest {
  constructor(questId = 'q_shadowguild_2') {
    this.questId = questId;
    this.faction = 'ShadowGuild';
    this.questTitle = 'DefendOutpost';
    this.requiredLevel = 15;
    this.stage = 'NOT_STARTED'; // NOT_STARTED, IN_PROGRESS, OBJECTIVE_MET, COMPLETED, FAILED
    this.objectives = [
      { id: 'obj_1', desc: 'Investigate sector coordinates', completed: false },
      { id: 'obj_2', desc: 'Neutralize enemy defenders', completed: false, count: 0, required: 11 },
      { id: 'obj_3', desc: 'Return to ShadowGuild liaison', completed: false }
    ];
    this.reputationReward = 150;
    this.goldReward = 350;
  }

  startQuest(player) {
    if (player.level < this.requiredLevel) {
      return { success: false, reason: 'Player level too low' };
    }
    this.stage = 'IN_PROGRESS';
    return { success: true, stage: this.stage, title: this.questTitle };
  }

  updateProgress(objectiveId, amount = 1) {
    const obj = this.objectives.find(o => o.id === objectiveId);
    if (!obj) return false;
    if (obj.required) {
      obj.count = Math.min(obj.required, obj.count + amount);
      if (obj.count >= obj.required) obj.completed = true;
    } else {
      obj.completed = true;
    }

    if (this.objectives.every(o => o.completed)) {
      this.stage = 'OBJECTIVE_MET';
    }
    return true;
  }

  completeQuest(player) {
    if (this.stage !== 'OBJECTIVE_MET') return { success: false, reason: 'Objectives incomplete' };
    this.stage = 'COMPLETED';
    player.gold += this.goldReward;
    player.addFactionReputation(this.faction, this.reputationReward);
    return { success: true, gold: this.goldReward, reputation: this.reputationReward };
  }
}

module.exports = { ShadowGuildDefendOutpostQuest };
