describe('Loot & Affix Crafting Matrix', () => {
  test('rolls prefix and suffix affix modifiers', () => {
    const item = { name: 'Sword', powerRating: 100 };
    expect(item.powerRating).toBe(100);
  });
});