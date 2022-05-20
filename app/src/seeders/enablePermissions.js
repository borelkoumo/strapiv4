const { CONSTANTS } = require("./constants");

/**
 * Enable actions for different roles in our app
 * @param {*} strapi Strapi object
 */
module.exports.enablePermissions = async (strapi) => {
  const result = []
  /**
   * ENABLE PERMISSION ON COMPANY
   */
  const defaultPermissions = [
    {
      roleType: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
      permissions: [
        {
          apiName: "company",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "company-user",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "hacker",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "invitation",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "march1st-user",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "program",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "submission",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "submission-status",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
      ]
    },
    {
      roleType: CONSTANTS.ROLES.HACKER.ROLE_TYPE,
      permissions: [
        {
          apiName: "company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "invitation",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "program",
          actions: ["find", "findOne"],
        },
        {
          apiName: "submission",
          actions: ["create", "find", "findOne", "update"],
        },
        {
          apiName: "submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
      permissions: [
        {
          apiName: "company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "invitation",
          actions: ["find", "findOne"],
        },
        {
          apiName: "march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "program",
          actions: ["find", "findOne"],
        },
        {
          apiName: "submission",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
      permissions: [
        {
          apiName: "company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "invitation",
          actions: ["create", "find", "findOne"],
        },
        {
          apiName: "march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "program",
          actions: ["create", "find", "findOne", "update", "createLocalization"],
        },
        {
          apiName: "submission",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
      ]
    },
  ]

  const defaultPermissions2 = [
    {
      roleType: CONSTANTS.ROLES.M1_ACCOUNT_MANAGER.ROLE_TYPE,
      permissions: [
        {
          apiName: "user",
          actions: ["find", "findOne", "me"],
        },
      ]
    },
    {
      roleType: CONSTANTS.ROLES.HACKER.ROLE_TYPE,
      permissions: [
        {
          apiName: "user",
          actions: ["find", "findOne", "me"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
      permissions: [
        {
          apiName: "user",
          actions: ["find", "findOne", "me"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
      permissions: [
        {
          apiName: "user",
          actions: ["find", "findOne", "me"],
        },
      ]
    },
  ]

  for (const role of defaultPermissions) {
    const { roleType, permissions } = role
    for (const permission of permissions) {
      const { apiName, actions } = permission
      for (const action of actions) {
        const actionId = `api::${apiName}.${apiName}.${action}`;
        let p = await _enable(
          strapi,
          roleType,
          actionId
        );
        result.push({ roleType, actionId, permission: p })
      }
    }
  }

  for (const role of defaultPermissions2) {
    const { roleType, permissions } = role
    for (const permission of permissions) {
      const { apiName, actions } = permission
      for (const action of actions) {
        const actionId = `${apiName}.${action}`;
        let p = await _enable(
          strapi,
          roleType,
          actionId
        );
        result.push({ roleType, actionId, permission: p })
      }
    }
  }

  return result;
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
