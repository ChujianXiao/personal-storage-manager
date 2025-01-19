import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "object" model, go to https://personal-storage-manager.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "1ZmBu5IKZ4Ia",
  fields: {
    childObjects: {
      type: "hasMany",
      children: { model: "object", belongsToField: "inObject" },
      storageKey: "so-EmszZ_sro",
    },
    description: { type: "string", storageKey: "h87bcJq7zBAc" },
    inObject: {
      type: "belongsTo",
      parent: { model: "object" },
      storageKey: "4SHiHe5tvjKa",
    },
    inRoom: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "room" },
      storageKey: "y4kf0pxp_x2O",
    },
    name: {
      type: "string",
      validations: {
        required: true,
        stringLength: { min: 2, max: 100 },
      },
      storageKey: "5hlvFhIX86ar",
    },
    userDefinedId: {
      type: "string",
      validations: { unique: { scopeByField: "inRoom" } },
      storageKey: "ld3ILIDeUir6",
    },
  },
};
