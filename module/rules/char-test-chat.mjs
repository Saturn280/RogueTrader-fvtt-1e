import { resolveCharacteristicTest } from "./char-test.mjs";

export async function rollCharacteristicTest(target) {
  const roll = await new Roll("1d100").evaluate();

  const result = resolveCharacteristicTest(
    target,
    roll.total
  );

  const outcome = result.success
    ? "Успех"
    : "Провал";

  const message = `
    <h2>Проверка характеристики</h2>
    <p>Целевое значение: <strong>${result.target}</strong></p>
    <p>Бросок: <strong>${result.roll}</strong></p>
    <p>Результат: <strong>${outcome}</strong></p>
    <p>Степени: <strong>${result.degrees}</strong></p>
  `;

  await ChatMessage.create({
    content: message,
    rolls: [roll]
  });

  return result;
}