
const { NumberField, SchemaField } = foundry.data.fields;

export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      characteristics: new SchemaField({
        weaponSkill: new NumberField({
          required: true,
          integer: true,
          initial: 30
        }),
        ballisticSkill: new NumberField({
          required: true,
          integer: true,
          initial: 30
        })
      })
    };
  }
}
