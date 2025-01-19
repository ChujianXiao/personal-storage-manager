import { applyParams, save, assert, ActionOptions } from "gadget-server";

/**
 * Creates a new room associated with the current user.
 * Requires an authenticated user session.
 * The room will be created with the provided name, optional description, and optional location.
 * Field validations are automatically applied by the framework.
 */

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections, session }) => {
  // Verify we have an authenticated user
  const userId = assert(session?.get("user"), "Must be signed in to create a room");
  
  // Apply the incoming params to the record
  applyParams(params, record);

  // Associate the room with the current user
  record.user = { _link: userId };

  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
};