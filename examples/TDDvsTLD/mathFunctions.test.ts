import { add, mul } from './mathFunction';

describe('Math functions test', () => {
  it('Check for add function', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('Check mul function', () => {
    expect(mul(2, 3)).toBe(6);
  });
});
