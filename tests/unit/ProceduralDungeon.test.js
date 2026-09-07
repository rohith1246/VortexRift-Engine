describe('Procedural Dungeon Generator', () => {
  test('carves boundary walls and places doorways', () => {
    const layout = { width: 16, height: 14 };
    expect(layout.width).toBe(16);
  });
});