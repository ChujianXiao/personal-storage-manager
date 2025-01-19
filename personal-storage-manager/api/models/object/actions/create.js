import { applyParams, save, ActionOptions, GadgetError } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, session }) => {
  // Verify user is authenticated
  if (!session || !session.get("user")) {
    throw new GadgetError("Unauthorized - must be signed in to create objects");
  }

  const currentUserId = session.get("user");

  // Load and verify room ownership
  const room = await api.room.findOne(params.inRoom?._link, {
    select: { id: true, userId: true }
  });

  if (room.userId !== currentUserId) {
    throw new GadgetError("Unauthorized - you can only create objects in rooms you own");
  }

  // If creating inside another object, verify parent object exists and is in same room
  if (params.inObject?._link) {
    const parentObject = await api.object.findOne(params.inObject._link, {
      select: { id: true, inRoomId: true }
    });

    if (parentObject.inRoomId !== params.inRoom?._link) {
      throw new GadgetError("Invalid parent object - must be in the same room as the new object");
    }
  }

  applyParams(params, record);

  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
};
