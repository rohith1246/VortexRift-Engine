const { RollbackManager } = require('../../src/netcode/RollbackManager');
describe('RollbackManager GGPO Netcode', () => {
  test('restores snapshot and resimulates frames on late input', () => {
    const net = new RollbackManager();
    net.saveSnapshot(5, { tick: 5, players: { p1: { x: 50, y: 50 } } });
    net.currentFrame = 7;
    const rb = net.receiveRemoteInput(5, 'p1', { dx: 2, dy: 1 });
    expect(rb.rolledBack).toBe(true);
  });
});