import { incrementNeighbors } from './CellManipulator';

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coords = [number, number];

export const CellState: Record<string, Cell> = {
  empty: 0,
  bomb: 9,
  hidden: 10,
  mark: 11,
  weakMark: 12,
};

export const emptyFieldGenerator = (size: number, state: Cell = CellState.empty): Field =>
  new Array(size).fill(null).map(() => new Array(size).fill(state));

export const fieldGenerator = (size: number, densityOfBombs: number): Field => {
  // eslint-disable-next-line prefer-const
  let result = emptyFieldGenerator(size);

  let unProcessedCell = size * size;
  let totalCellsWithBomb = unProcessedCell * densityOfBombs;

  if (densityOfBombs >= 0 && densityOfBombs <= 1) {
    for (let i = 0; i < size; i++) {
      // const bombIndex = Math.random() * size;

      for (let j = 0; j < size; j++) {
        if (totalCellsWithBomb === 0) return result;

        if (unProcessedCell / totalCellsWithBomb > Math.random()) {
          result[i][j] = CellState.bomb;
          incrementNeighbors([i, j], result);
          totalCellsWithBomb--;
        }

        unProcessedCell--;
      }
    }
  } else {
    throw new Error('Density must be between 0 and 1');
  }

  return result;
};
