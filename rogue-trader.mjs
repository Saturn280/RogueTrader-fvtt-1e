
import { rollCharacteristicTest } from "./module/rules/char-test-chat.mjs";
import { RogueTraderCharacterSheet } from "./module/sheets/character-sheet.mjs";
import { CharacterData } from "./module/data/character-data.mjs";

Hooks.once("init", () => {
  console.log("Rogue Trader | Initializing system");

  CONFIG.Actor.dataModels.character = CharacterData;

  foundry.documents.collections.Actors.unregisterSheet(
    "core",
    foundry.appv1.sheets.ActorSheet
  );

  foundry.documents.collections.Actors.registerSheet(
    "roguetrader",
    RogueTraderCharacterSheet,
    {
      types: ["character"],
      makeDefault: true
    }
  );

  game.roguetrader = {
    rollCharacteristicTest
  };
});