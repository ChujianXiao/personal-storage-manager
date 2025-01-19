import { applyParams, save, ActionOptions } from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections }) => {
  // Verify room ownership
  const room = await api.room.findOne(record.inRoomId, {
    select: { id: true, userId: true }
  });

  if (!connections.session || !connections.session.get("user") || room.userId !== connections.session.get("user")) {
    throw new Error("You do not have permission to update objects in this room");
  }

  // If changing parent object, validate it exists and is in same room
  if (params.object?.inObject) {
    const parentObject = await api.object.findOne(params.object.inObject._link, {
      select: { id: true, inRoomId: true }
    });

    if (!parentObject) {
      throw new Error("Parent object not found");
    }

    if (parentObject.inRoomId !== record.inRoomId) {
      throw new Error("Parent object must be in the same room");
    }
  }

  applyParams(params, record);
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update",
};
