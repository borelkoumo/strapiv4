/**
   * Enable action on a controller for a specific role
   * @param {*} strapi The strapi object
   * @param {*} roleType The role type
   * @param {*} apiName The name of the api where the controller lives
   * @param {*} controller The controller where the action lives
   * @param {*} action The action itself
   */

const enablePermission = async (strapi, roleType, actionId) => {
  // get the role entity
  try {
    const role = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: {
          type: roleType,
        },
        populate: ["permissions"],
      });

    // Get permissions associated with the role
    const rolePermissions = role.permissions.find(
      (permission) => permission.action === actionId
    );
    if (!rolePermissions) {
      // permission not yet created
      return await strapi.db
        .query("plugin::users-permissions.permission")
        .create({
          data: {
            action: actionId,
            role: role.id,
          },
        });
    }
  } catch (error) {
    strapi.log.error(
      `Bootstrap script: Could not update settings. ${error.message}`
    );
    console.log(error);
  }
}
module.exports.enablePermission = enablePermission


/**
 * Enable actions for different roles in our app
 * @param {*} strapi Strapi object
 */
const enablePermissions = async (strapi, defaultPermissions) => {
  const result = []

  for (const role of defaultPermissions) {
    const { roleType, permissions } = role
    for (const permission of permissions) {
      const { apiName, actions } = permission
      for (const action of actions) {
        const actionId = `${apiName}.${action}`;
        let p = await enablePermission(
          strapi,
          roleType,
          actionId
        );
        result.push({ roleType, actionId, permission: p })
      }
    }
    return result;
  }
}
module.exports.enablePermissions = enablePermissions
