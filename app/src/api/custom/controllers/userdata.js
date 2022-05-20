'use strict';

/**
 * A set of functions called "actions" for `custom/userdata`
 */

module.exports = {
  async getUserdata(ctx, next) {
    const { id } = ctx.query;
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id },
      populate: ["role", "company_user", "hacker", "march1st_user"],
    });
    console.log("User = ", user)
    if (!user) {
      console.log("User not found. ID = ", id)
      return
    }
    const roleType = user.role.type;
    console.log(`roleType = `, roleType);

    // recupérer le role du user dans la DB
    const role = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: {
          type: roleType,
        },
        populate: ["permissions"],
      });

    // L'action à vérifier
    // Chaque action est au format `api::${apiName}.${controller}.${action}`;
    const permissions = {
      ["api::program.program.create"]: false,
      [`api::program.program.update`]: false,
      [`api::program.program.find`]: false,
      [`api::program.program.findOne`]: false,
      [`api::company.company.find`]: false,
      [`api::company.company.findOne`]: false,
    };

    Object.keys(permissions).forEach((actionId) => {
      const roleHasPermission = role.permissions.find(
        (permission) => permission.action === actionId
      );
      if (roleHasPermission) {
        permissions[actionId] = true;
      }
    });
    delete role.permissions
    console.log(`Permissions for role ${roleType} : `, permissions);
    ctx.body = { user, permissions };
  }
};
