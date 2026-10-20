
/**
 * Рассчитывает результат проверки Rogue Trader через d100.
 *
 * target — итоговое целевое значение проверки.
 * roll — результат броска от 1 до 100.
 *
 * Формула степеней успеха здесь предварительная:
 * её нужно сверить с твоей книгой правил FFG
 * перед тем, как считать её окончательной.
 */
export function resolveCharacteristicTest(target, roll) {
  if (!Number.isInteger(target) || target < 1 || target > 100) {
    throw new RangeError("Target must be an integer from 1 to 100");
  }

  if (!Number.isInteger(roll) || roll < 1 || roll > 100) {
    throw new RangeError("Roll must be an integer from 1 to 100");
  }

  const success = roll <= target;

  // Сравниваем десятки целевого значения и броска.
  const targetTens = Math.floor(target / 10);
  const rollTens = Math.floor(roll / 10);

  const degrees = success
    ? targetTens - rollTens + 1
    : rollTens - targetTens + 1;

  return {
    target,
    roll,
    success,
    degrees: Math.max(1, degrees)
  };
}
test("minimum roll is handled correctly", () => {
  const result = resolveCharacteristicTest(45, 1);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 4);
});

test("maximum roll against maximum target succeeds", () => {
  const result = resolveCharacteristicTest(100, 100);

  assert.equal(result.success, true);
  assert.equal(result.degrees, 1);
});