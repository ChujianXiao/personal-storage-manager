import { RouteHandler } from "gadget-server";

/**
 
 * Resolves the location path for an object by ID
 *
 * @type { RouteHandler }
 */
const route = async ({ request, reply, api, logger, applicationSession }) => {
  // Extract and validate objectId
  const { objectId } = request.query;
  if (!objectId) {
    return reply
      .code(400)
      .send({ success: false, error: "Missing required parameter: objectId" });
  }
 

  // Validate session
  if (!applicationSession) {
    return reply
      .code(401)
      .send({ success: false, error: "Authentication required" });
  }

  try {
    // Call resolve action
    const result = await api.object.resolve(objectId);

    // Return success response
    return reply.code(200).send({
      success: true,
      result,
    });
  } catch (error) {
    logger.error({ error, objectId }, "Error resolving object location");
    return reply.code(500).send({
      success: false,
      error: "An unexpected error occurred while resolving object location",
    });
  }
};
 

export default route;
