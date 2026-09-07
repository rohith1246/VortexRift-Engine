/**
 * RollbackManager.js - Deterministic GGPO-Style Rollback Frame Buffer
 */
class RollbackManager {
  constructor(maxRollbackFrames = 16) {
    this.maxRollbackFrames = maxRollbackFrames;
    this.currentFrame = 0;
    this.confirmedFrame = 0;
    this.stateHistory = new Map();
    this.inputHistory = new Map();
  }

  saveSnapshot(frame, state) {
    this.stateHistory.set(frame, JSON.parse(JSON.stringify(state)));
    if (this.stateHistory.size > this.maxRollbackFrames * 2) {
      const oldestKey = this.stateHistory.keys().next().value;
      this.stateHistory.delete(oldestKey);
    }
  }

  receiveRemoteInput(frame, playerId, inputData) {
    if (!this.inputHistory.has(frame)) {
      this.inputHistory.set(frame, new Map());
    }
    this.inputHistory.get(frame).set(playerId, inputData);

    if (frame < this.currentFrame) {
      return this.executeRollback(frame);
    }
    return { rolledBack: false };
  }

  executeRollback(targetFrame) {
    const snapshot = this.stateHistory.get(targetFrame);
    if (!snapshot) return { rolledBack: false, error: 'Snapshot missing' };

    let state = JSON.parse(JSON.stringify(snapshot));
    for (let f = targetFrame; f < this.currentFrame; f++) {
      const frameInputs = this.inputHistory.get(f) || new Map();
      state = this.simulateFrame(state, frameInputs);
      this.saveSnapshot(f + 1, state);
    }

    return { rolledBack: true, fromFrame: targetFrame, toFrame: this.currentFrame, restoredState: state };
  }

  simulateFrame(state, inputs) {
    state.tick++;
    for (const [pid, input] of inputs) {
      if (state.players[pid]) {
        state.players[pid].x += (input.dx || 0) * 5;
        state.players[pid].y += (input.dy || 0) * 5;
      }
    }
    return state;
  }
}

module.exports = { RollbackManager };
