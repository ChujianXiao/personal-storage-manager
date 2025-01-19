import { applyParams, save, assert, ActionOptions } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, record, session, logger, api }) => {
  // Verify user is authenticated and owns this room
  const userId = session?.get("user");
  assert(userId, "You must be signed in to update a room");
  assert(
    record.userId === userId,
    "You can only update rooms that you own"
  );

  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};
