import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://personal-storage-manager.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "8-DgHeTSQE1v",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "oLiJcJXe9Qo7",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "pTwNqHw0dAvd",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "0xHGigc47uw-",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "dTx67fxuv50L",
    },
    firstName: { type: "string", storageKey: "UtmmuUBkHznr" },
    googleImageUrl: { type: "url", storageKey: "-33u7WskdKwM" },
    googleProfileId: { type: "string", storageKey: "lXMn_om9dORU" },
    lastName: { type: "string", storageKey: "XVEeQDdgdPe_" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "LMQuGXLgkswb",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "8f4HhvGIElfX",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "V_-cMvDGp7c_",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "fjLagXmRNy9L",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "RQ4QkDYPAQA0",
    },
    roomIdList: {
      type: "hasMany",
      children: { model: "room", belongsToField: "user" },
      storageKey: "NGaOvYRkcvJH",
    },
  },
};
