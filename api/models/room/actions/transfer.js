import { applyParams, save, ActionOptions, GadgetError, InvalidStateError } from "gadget-server";

 
  
export const params = {
  newUserId: {
    type: "string",
  }
};
 
export const run = async ({ params, record, logger, api, connections, session }) => {
  
 
  if (!session?.get("user")) {
    throw new GadgetError({
      code: "UNAUTHORIZED",
      message: "Must be signed in to transfer a room",
    });
  }

  const currentUserId = session.get("user");

 
  if (record.user?.id !== currentUserId) {
    throw new InvalidStateError("Only the room owner can transfer ownership");
  }

  try {
    await api.user.findOne(params.newUserId);
  } catch (error) {
    throw new GadgetError({
      code: "NOT_FOUND", 
      message: "New user not found",
    });
  }

  record.user = { _link: params.newUserId };
  await save(record);
};
 

export const options = {
  actionType: "update",
};
