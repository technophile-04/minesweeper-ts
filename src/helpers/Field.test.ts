import { emptyFieldGenerator, CellState, fieldGenerator } from './Field';

const { empty, hidden, bomb } = CellState;

describe('Filed Generator', () => {
  describe('emptyFiledGenerator tests', () => {
    it('2x2', () => {
      expect(emptyFieldGenerator(2, empty)).toStrictEqual([
        [empty, empty],
        [empty, empty],
      ]);
    });
    it('3x3', () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ]);
    });
    it('2x2 empty filed', () => {
      expect(emptyFieldGenerator(2, hidden)).toStrictEqual([
        [hidden, hidden],
        [hidden, hidden],
      ]);
    });
  });
  describe('Simple case', () => {
    it('Throw error for density not between 0 and 1', () => {
      const errorText = 'Density must be between 0 and 1';
      expect(() => fieldGenerator(2, -1)).toThrowError(errorText);
    });

    it('Smallest possible filed without mine', () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[empty]]);
    });

    it('Smallest possible field with mine', () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[bomb]]);
    });

    it('2x2 with 50% probability', () => {
      const field = fieldGenerator(2, 0.5);

      const flatField = field.flat();

      const cellsWithBomb = flatField.filter((cell) => cell === bomb);

      console.table(field);

      const emptyCells = flatField.filter((cell) => cell === 2);

      expect(cellsWithBomb).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });

    it('Real game field size = 10x10 with 1/4 mined cells (25 mines)', () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);

      console.table(field);

      const flatField = field.flat();

      expect(flatField.filter((cell) => cell === bomb)).toHaveLength(25);
    });
  });
});
