const { CONSTANTS } = require("./constants");

/**
 * Enable actions for different roles in our app
 * @param {*} strapi Strapi object
 */
module.exports.enablePermissions = async (strapi) => {
  const permissions = []
  /**
   * ENABLE PERMISSION ON COMPANY
   */
  const roles = [
    {
      roleType: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
      roleActions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
    },
    { roleType: CONSTANTS.ROLES.HACKER.ROLE_TYPE, roleActions: ["find", "findOne"] },
    { roleType: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE, roleActions: ["find", "findOne"] },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
      roleActions: ["find", "findOne", "update", "createLocalization"],
    },
  ]
  const apiNames = [
    "company",
    "company-user",
    "hacker",
    "invitation",
    "march1st-user",
    "program",
    "submission",
    "submission-status",
  ]
  for (const role of roles) {
    const { roleType, roleActions } = role
    for (const apiName of apiNames) {
      for (const action of roleActions) {
        const actionId = `api::${apiName}.${apiName}.${action}`;
        let permission = await _enable(
          strapi,
          roleType,
          actionId
        );
        permissions.push({ roleType, actionId, permission })
      }
    }
  }

  // Enable permissions on users-permissions.user
  // const apiIds2 = [
  //   ["users-permissions", "user"],
  //   ["custom/userdata", "userdata"],
  // ]

  // for (const api of apiIds2) {
  //   let p1 = await _enable(
  //     strapi,
  //     CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
  //     api[0],
  //     api[1],
  //     ["find", "findOne", "me"]
  //   );
  //   // Enable for HACKER
  //   let p2 = await _enable(
  //     strapi,
  //     CONSTANTS.ROLES.HACKER.ROLE_TYPE,
  //     api[0],
  //     api[1],
  //     ["find", "findOne", "me"]
  //   );
  //   // Enable for PROGRAM_MANAGER
  //   let p3 = await _enable(
  //     strapi,
  //     CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
  //     api[0],
  //     api[1],
  //     ["find", "findOne", "me"]
  //   );
  //   // Enable for PROGRAM_SUPER_ADMIN
  //   let p4 = await _enable(
  //     strapi,
  //     CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
  //     api[0],
  //     api[1],
  //     ["find", "findOne", "me"]
  //   );
  //   permissions.push({ id: api[0] + '.' + api[1], permission: p1 });
  //   permissions.push({ id: api[0] + '.' + api[1], permission: p2 });
  //   permissions.push({ id: api[0] + '.' + api[1], permission: p3 });
  //   permissions.push({ id: api[0] + '.' + api[1], permission: p4 });
  // }

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
async function _enable(strapi, roleType, actionId) {
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
