import { rollCharacteristicTest } from "./module/rules/char-test-chat.mjs";

Hooks.once("init", () => {
  console.log("Rogue Trader | Initializing system");

  game.roguetrader = {
    rollCharacteristicTest
  };

  console.log(
    "Rogue Trader | Test with: game.roguetrader.rollCharacteristicTest(45)"
  );
});