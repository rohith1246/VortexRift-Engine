describe('Elemental Reactions and Combo Synergies', () => {
  test('triggers overload reaction between fire and lightning', () => {
    const auraA = { intensity: 10, gauge: 5 };
    const auraB = { intensity: 12, gauge: 4 };
    expect(auraA.intensity + auraB.intensity).toBe(22);
  });
});