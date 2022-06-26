const { CONSTANTS } = require("./constants");

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

module.exports.defaultPermissions = defaultPermissions