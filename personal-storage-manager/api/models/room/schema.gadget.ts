import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "room" model, go to https://personal-storage-manager.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DEfbEDGe7pZl",
  fields: {
    description: { type: "string", storageKey: "7tDaX0yyXuZi" },
    location: {
      type: "string",
      validations: { stringLength: { min: null, max: 20 } },
      storageKey: "3YfssX1xhzw4",
    },
    name: {
      type: "string",
      validations: {
        required: true,
        stringLength: { min: 2, max: 100 },
      },
      storageKey: "8Jyhf8EFJebv",
    },
    objects: {
      type: "hasMany",
      children: { model: "object", belongsToField: "inRoom" },
      storageKey: "Y8zrW25Dpi-y",
    },
    user: {
      type: "belongsTo",
      validations: { required: true },
      parent: { model: "user" },
      storageKey: "DEfbEDGe7pZl-user",
    },
  },
};
