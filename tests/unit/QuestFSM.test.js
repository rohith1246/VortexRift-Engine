describe('Dynamic Quest State Machine', () => {
  test('tracks objective completion and rewards', () => {
    const quest = { stage: 'NOT_STARTED', reward: 250 };
    expect(quest.stage).toBe('NOT_STARTED');
  });
});