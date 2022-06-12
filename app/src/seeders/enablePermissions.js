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
          apiName: "api::company.company",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::company-user.company-user",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::hacker.hacker",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::invitation.invitation",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::march1st-user.march1st-user",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::program.program",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::submission.submission",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },
        {
          apiName: "api::submission-status.submission-status",
          actions: ["create", "find", "findOne", "update", "delete", "createLocalization"],
        },

        {
          apiName: "plugin::users-permissions.user",
          actions: ["find", "findOne", "me"],
        },
        {
          apiName: "api::custom.userdata",
          actions: ["getUserdata"],
        },
      ]
    },
    {
      roleType: CONSTANTS.ROLES.HACKER.ROLE_TYPE,
      permissions: [
        {
          apiName: "api::company.company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::company-user.company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::hacker.hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::invitation.invitation",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "api::march1st-user.march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::program.program",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::submission.submission",
          actions: ["create", "find", "findOne", "update"],
        },
        {
          apiName: "api::submission-status.submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
        {
          apiName: "plugin::users-permissions.user",
          actions: ["find", "findOne", "me"],
        }, {
          apiName: "api::custom.userdata",
          actions: ["getUserdata"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_MANAGER.ROLE_TYPE,
      permissions: [
        {
          apiName: "api::company.company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::company-user.company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::hacker.hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::invitation.invitation",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::march1st-user.march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::program.program",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::submission.submission",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "api::submission-status.submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
        {
          apiName: "plugin::users-permissions.user",
          actions: ["find", "findOne", "me"],
        }, {
          apiName: "api::custom.userdata",
          actions: ["getUserdata"],
        },
      ],
    },
    {
      roleType: CONSTANTS.ROLES.PROGRAM_SUPER_ADMIN.ROLE_TYPE,
      permissions: [
        {
          apiName: "api::company.company",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::company-user.company-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::hacker.hacker",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::invitation.invitation",
          actions: ["create", "find", "findOne"],
        },
        {
          apiName: "api::march1st-user.march1st-user",
          actions: ["find", "findOne"],
        },
        {
          apiName: "api::program.program",
          actions: ["create", "find", "findOne", "update", "createLocalization"],
        },
        {
          apiName: "api::submission.submission",
          actions: ["find", "findOne", "update"],
        },
        {
          apiName: "api::submission-status.submission-status",
          actions: ["create", "find", "findOne", "update"],
        },
        {
          apiName: "plugin::users-permissions.user",
          actions: ["find", "findOne", "me"],
        }, {
          apiName: "api::custom.userdata",
          actions: ["getUserdata"],
        },
      ]
    },
  ]

  for (const role of defaultPermissions) {
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

    return result;
  }

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
}
