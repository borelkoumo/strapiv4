const { CONSTANTS } = require("./constants");

/**
 * Enable actions for different roles in our app
 * @param {*} strapi Strapi object
 */
module.exports.enablePermissions = async (strapi) => {
  /**
   * ENABLE PERMISSION ON COMPANY
   */
  const apiIds = [
    "company",
    "company-user",
    "hacker",
    "invitation",
    "march1st-user",
    "program",
    "submission",
    "submission-status",
  ]
  let permissions = [];
  for (let apiId of apiIds) {
    // Enable for M1_ACCOUNT_MANAGER
    let perm1 = await _enable(
      strapi,
      CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
      apiId,
      apiId,
      ["create", "find", "findOne", "update", "delete", "createLocalization"]
    );
    // Enable for HACKER
    let perm2 = await _enable(
      strapi,
      CONSTANTS.ROLES.HACKER.ROLE_TYPE,
      apiId,
      apiId,
      ["find", "findOne"]
    );
    // Enable for PROGRAM_MANAGER
    let perm3 = await _enable(
      strapi,
      CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
      apiId,
      apiId,
      ["find", "findOne"]
    );
    // Enable for PROGRAM_SUPER_ADMIN
    let perm4 = await _enable(
      strapi,
      CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
      apiId,
      apiId,
      ["find", "findOne", "update", "createLocalization"]
    );
    // permissions.push({ role: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE, id, permission: perm1 });
    // permissions.push({ role: CONSTANTS.ROLES.HACKER.ROLE_TYPE, id, permission: perm2 });
    // permissions.push({ role: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE, id, permission: perm3 });
    // permissions.push({ role: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE, id, permission: perm4 });
    permissions.push({ id: apiId, permission: perm1 });
    permissions.push({ id: apiId, permission: perm2 });
    permissions.push({ id: apiId, permission: perm3 });
    permissions.push({ id: apiId, permission: perm4 });
  }

  // Enable permissions on users-permissions.user
  let p1 = await _enable(
    strapi,
    CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
    "users-permissions",
    "user",
    ["find", "findOne", "me"]
  );
  // Enable for HACKER
  let p2 = await _enable(
    strapi,
    CONSTANTS.ROLES.HACKER.ROLE_TYPE,
    "users-permissions",
    "user",
    ["find", "findOne", "me"]
  );
  // Enable for PROGRAM_MANAGER
  let p3 = await _enable(
    strapi,
    CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
    "users-permissions",
    "user",
    ["find", "findOne", "me"]
  );
  // Enable for PROGRAM_SUPER_ADMIN
  let p4 = await _enable(
    strapi,
    CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
    "users-permissions",
    "user",
    ["find", "findOne", "me"]
  );
  // permissions.push({ role: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE, id, permission: p1 });
  // permissions.push({ role: CONSTANTS.ROLES.HACKER.ROLE_TYPE, id, permission: p2 });
  // permissions.push({ role: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE, id, permission: p3 });
  // permissions.push({ role: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE, id, permission: p4 });
  permissions.push({ id: "users-permissions.user", permission: p1 });
  permissions.push({ id: "users-permissions.user", permission: p2 });
  permissions.push({ id: "users-permissions.user", permission: p3 });
  permissions.push({ id: "users-permissions.user", permission: p4 });

  return permissions;
};

/**
 * Enable action on a controller for a specific role
 * @param {*} strapi The strapi object
 * @param {*} roleType The role type
 * @param {*} apiName The name of the api where the controller lives
 * @param {*} controller The controller where the action lives
 * @param {*} action The action itself
 */
async function _enable(strapi, roleType, apiName, controller, actions = []) {
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

    const promises = await Promise.all(
      actions.map((action) => {
        const actionId = `api::${apiName}.${controller}.${action}`;
        // Get permissions associated with the role
        const rolePermissions = role.permissions.find(
          (permission) => permission.action === actionId
        );
        if (!rolePermissions) {
          // permission not yet created
          return strapi.db
            .query("plugin::users-permissions.permission")
            .create({
              data: {
                action: actionId,
                role: role.id,
              },
            });
        }
      })
    );
    return promises;
  } catch (error) {
    strapi.log.error(
      `Bootstrap script: Could not update settings. ${error.message}`
    );
    console.log(error);
  }
}
