import { deleteRecord, ActionOptions, assert } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, record, logger, api, connections, session }) => {
  // Verify user is authenticated
  assert(session?.get("user"), "Must be authenticated to delete account");

  // Verify user is deleting their own account
  const sessionUserId = session.get("user");
  assert(
    sessionUserId === record.id,
    "You can only delete your own account"
  );

  // Find all rooms belonging to the user
  const rooms = await api.room.findMany({
    filter: { userId: { equals: record.id } }
  });

  // Delete all rooms (which will cascade delete their objects)
  await Promise.all(rooms.map(room => api.room.delete(room.id)));

  // Delete the user account
 
  await deleteRecord(record);
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete",
};
