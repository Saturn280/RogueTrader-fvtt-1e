
const { DocumentSheetV2, HandlebarsApplicationMixin } =
  foundry.applications.api;

export class RogueTraderCharacterSheet extends
  HandlebarsApplicationMixin(DocumentSheetV2) {

  static DEFAULT_OPTIONS = {
    tag: "form",
    classes: ["rt-character-sheet"],
    window: {
      title: "Персонаж Rogue Trader",
      resizable: true
    },
    position: {
      width: 600,
      height: 700
    },
    form: {
      handler: RogueTraderCharacterSheet.#onSubmit,
      submitOnChange: false,
      closeOnSubmit: false
    }
  };

  static PARTS = {
    main: {
      template: "systems/roguetrader/templates/actor/character-sheet.hbs"
    }
  };

  get title() {
    return this.document?.name ?? "Персонаж Rogue Trader";
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = this.document;
    return context;
  }

  async _onRender(context, options) {
    await super._onRender(context, options);

    this.element
      .querySelectorAll("[data-characteristic]")
      .forEach(button => {
        button.addEventListener("click", async event => {
          event.preventDefault();

          const key = button.dataset.characteristic;
          const target = Number(
            this.document.system.characteristics?.[key]
          );

          if (!Number.isFinite(target)) {
            ui.notifications.warn(
              "Не удалось прочитать значение характеристики."
            );
            return;
          }

          await game.roguetrader.rollCharacteristicTest(target);
        });
      });
  }

  static async #onSubmit(event, form, formData) {
    event.preventDefault();

    const data = foundry.utils.expandObject(formData.object);
    const updates = {};

    if (data.name !== undefined) {
      updates.name = data.name;
    }

    if (data.system?.characteristics) {
      const characteristics = data.system.characteristics;

      if (characteristics.weaponSkill !== undefined) {
        updates["system.characteristics.weaponSkill"] =
          Number(characteristics.weaponSkill);
      }

      if (characteristics.ballisticSkill !== undefined) {
        updates["system.characteristics.ballisticSkill"] =
          Number(characteristics.ballisticSkill);
      }
    }

    await this.document.update(updates);
  }
}
