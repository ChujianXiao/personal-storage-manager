import { deleteRecord, ActionOptions, GadgetError } from "gadget-server";

/**
 * Delete a room if the authenticated user owns it
 * @param {object} context - The action context
 * @param {object} context.session - The current session
 * @param {object} context.record - The room record being deleted
 * @throws {GadgetError} If user is not authenticated or doesn't own the room
 * @throws {GadgetError} If deletion of contained objects fails
 */
export const run = async ({ params, record, logger, api, session }) => {
  // Check user is authenticated
  if (!session?.get("user")) {
    throw new GadgetError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to delete rooms"
    });
  }

  // Verify room ownership
  if (record.user._link !== session.get("user")) {
    throw new GadgetError({
      code: "FORBIDDEN", 
      message: "You can only delete rooms you own"
    });
  }

  // Find all objects in this room
  const objects = await api.object.findMany({
    filter: {
      inRoomId: { equals: record.id }
    },
    select: { id: true }
  });

  // Delete all objects first
  try {
    await Promise.all(
      objects.map(object => api.object.delete(object.id))
    );
  } catch (error) {
    throw new GadgetError({
      code: "INTERNAL_ERROR",
      message: "Failed to delete all objects in room",
      cause: error
    });
  }

  // Finally delete the room itself
  await deleteRecord(record);
};

export const options = {
  actionType: "delete",
};
