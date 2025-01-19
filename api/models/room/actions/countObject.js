import { ActionOptions } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, session, api }) => {
  // Verify room exists and user owns it
  const room = await api.room.findOne(params.roomId, {
    select: {
      id: true,
      userId: true
    }
  });

  // Verify current user owns the room
  if (!session?.get("user") || room.userId !== session.get("user")) {
    throw new Error("Not authorized to access this room");
  }

  // Track counted objects to avoid duplicates
  const counted = new Set();

  // Recursively count child objects
  async function countChildren(objectId) {
    if (counted.has(objectId)) return 0;
    counted.add(objectId);

    const children = await api.object.findMany({
      filter: {
        inObjectId: {
          equals: objectId
        }
      },
      select: {
        id: true
      }
    });

    let childCount = children.length;
    for (const child of children) {
      childCount += await countChildren(child.id);
    }
    return childCount;
  }

  // Get direct objects in room
  const directObjects = await api.object.findMany({
    filter: { inRoomId: { equals: room.id } },
    select: { id: true }
  });

  // Count direct objects plus their children
  let totalCount = directObjects.length;
  for (const obj of directObjects) {
    totalCount += await countChildren(obj.id);
  }

  return totalCount;
 
};

export const params = {
  roomId: { type: "string" }
};

/** @type { ActionOptions } */
export const options = {
 
  actionType: "custom",
  returnType: true
};
