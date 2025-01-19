import { applyParams, save, ActionOptions, assert } from "gadget-server";

export const params = {
  targetRoomId: { type: "string" }
};
 

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, session }) => {
  // Verify input
  assert(params.targetRoomId, "Target room ID is required");
  
  // Get current user ID
  const userId = session?.get("user");
  assert(userId, "Must be signed in to transfer objects");

  // Verify ownership of both rooms
  const sourceRoom = await api.room.findFirst({
    filter: {
      id: { equals: record.inRoomId },
      userId: { equals: userId }
    }
  });
  assert(sourceRoom, "Source room not found or you don't have permission to access it");

  const targetRoom = await api.room.findFirst({
    filter: {
      id: { equals: params.targetRoomId },
      userId: { equals: userId }
    }
  });
  assert(targetRoom, "Target room not found or you don't have permission to access it");

  // Store original parent for child updates
  const originalParentId = record.inObjectId;
  const originalRoomId = record.inRoomId;

  // Find all child objects
  const childObjects = await api.object.findMany({
    filter: {
      inObjectId: { equals: record.id }
    }
  });

  // Update all child objects in parallel
  await Promise.all(childObjects.map(child => 
    api.object.update(child.id, {
      inObject: originalParentId ? { _link: originalParentId } : null,
      inRoom: { _link: originalRoomId }
    })
  ));

  // Update the main object
  record.inRoom = { _link: params.targetRoomId };
  record.inObject = null;
 
  await save(record);
};

/** @type { ActionOptions } */
export const options = {
 
  actionType: "custom"
};
