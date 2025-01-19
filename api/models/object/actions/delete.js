import { deleteRecord, ActionOptions, assert, InvalidStateError } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, session }) => {
  // Verify user owns the room
  const userId = session?.get("user");
  assert(userId, "Must be signed in to delete objects");

  const room = await api.room.findFirst({
    filter: { id: { equals: record.inRoomId } },
    select: { userId: true }
  });

  if (room.userId !== userId) {
    throw new InvalidStateError("You don't have permission to delete objects in this room");
  }

  // Store original parent ID before deletion
  const originalParentId = record.inObjectId;

  // Find all child objects
  const childObjects = await api.object.findMany({
    filter: { inObjectId: { equals: record.id } },
    select: { id: true }
  });

  // Update all child objects to point to original parent
  await Promise.all(
    childObjects.map(child => api.object.update(child.id, { inObject: originalParentId ? { _link: originalParentId } : null }))
  );

  // Delete the object after children are updated
  await deleteRecord(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
};
