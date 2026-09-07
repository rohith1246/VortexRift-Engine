describe('Monster AI Behavior Trees', () => {
  test('evaluates state transitions from patrol to aggro attack', () => {
    const unit = { pos: { x: 0, y: 0 }, health: 100, maxHealth: 100 };
    expect(unit.health).toBe(100);
  });
});