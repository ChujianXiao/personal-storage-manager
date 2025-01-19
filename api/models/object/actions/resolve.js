import { ActionOptions, InvalidRecordError } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, session, api }) => {
  // Verify we have a logged in user
  if (!session?.get("user")) {
    throw new InvalidRecordError("Must be logged in", [
      { apiIdentifier: "resolve", message: "Authentication required" }
    ]);
  }

  // Get the target object
  const object = await api.object.findOne(params.objectId, {
    select: { id: true, inObject: true, inRoom: { id: true, user: { id: true } } }
  }).catch(() => {
    throw new InvalidRecordError("Object not found", [
      { apiIdentifier: "resolve", message: "Object does not exist" }
    ]);
  });

  // Verify room ownership
  if (!object.inRoom?.user?.id || object.inRoom.user.id !== session.get("user")) {
    throw new InvalidRecordError("Not authorized", [
      { apiIdentifier: "resolve", message: "Room does not belong to current user" }
    ]);
  }

  // Build path from root to target
  const path = [object.id];
  let current = object;

  // Trace up parent chain
  while (current.inObject) {
    const parent = await api.object.findOne(current.inObject.id, {
      select: { id: true, inObject: true }
    }).catch(() => {
      throw new InvalidRecordError("Invalid parent chain", [
        { apiIdentifier: "resolve", message: "Parent object not found" }
      ]);
    });
    path.unshift(parent.id);
    current = parent;
  }

  return path;
 
};

export const params = {
  objectId: { type: "string" }
};

/** @type { ActionOptions } */
export const options = {
 
  actionType: "custom",
  returnType: true
};
