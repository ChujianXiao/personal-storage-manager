import { ActionOptions, assert } from "gadget-server";
 

/** @type { ActionRun } */
export const run = async ({ params, session, api }) => {
  // Verify we have an authenticated user
  const userId = assert(session?.get("user"), "Must be signed in to resolve object children");
  
  // Get the target object and its room
  const object = await api.object.findOne(params.objectId, {
    select: {
      id: true,
      inRoom: {
        id: true,
        user: {
          id: true
        }
      }
    }
  });
  
  // Verify room ownership
  assert(
    object.inRoom?.user?.id === userId,
    "You don't have permission to resolve children of this object"
  );

  // Helper function to get descendants at each level
  const getDescendantsAtLevel = async (parentId, levelResults = []) => {
    // Get direct children of this parent
    const children = await api.object.findMany({
      filter: {
        inObjectId: {
          equals: parentId
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        userDefinedId: true
      }
    });

    if (children.length === 0) {
      return levelResults;
    }

    // Add this level's children to results
    levelResults.push(children);

    // Recursively get next level for each child
    const nextLevelPromises = children.map(child => 
      getDescendantsAtLevel(child.id, levelResults)
    );
    
    await Promise.all(nextLevelPromises);
    
    return levelResults;
  
  // Get all descendants organized by level
  const results = await getDescendantsAtLevel(object.id, []);
  
  return results;
};
 
/** @type { Record<string, any> } */
export const params = {
  objectId: {
    type: "string"
  }
};
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  returnType: true
 
};
