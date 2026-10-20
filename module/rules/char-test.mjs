
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
  if (!Number.isInteger(roll) || roll < 1 || roll > 100) {
    throw new RangeError("Roll must be an integer from 1 to 100");
  }

  const success = roll <= target;
  const degrees = Math.floor(Math.abs(target-roll) / 10);
  return {
    target,
    roll,
    success,
    degrees
  };
}
