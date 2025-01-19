import { assert } from "gadget-server";

/** @type { ActionRun } */
export const run = async ({ params, logger, api, session }) => {
  // Verify user is authenticated
  const userId = assert(session?.get("user"), "You must be signed in to list rooms");

  try {
    const rooms = await api.room.findMany({
      filter: {
        userId: { equals: userId }
      },
      select: {
        id: true,
        name: true,
        description: true,
        location: true
      }
    });

    return rooms;
  } catch (error) {
    throw error;
  }
};
