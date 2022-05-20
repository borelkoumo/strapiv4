const db = require("./data");

module.exports.createRolesIfNotExist = async (strapi) => {
  const results = [];
  strapi.log.debug("Creating roles in plugin::users-permissions.role");
  for (const role of db.roles) {
    let exist = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: role.type },
      });
    if (!exist) {
      const r = await strapi.db
        .query("plugin::users-permissions.role")
        .create({ data: role });
      results.push(r);
    }
  }
  return results;
};

module.exports.createUsersIfNotExists = async (strapi) => {
  strapi.log.debug("Creating users in plugin::users-permissions.user");
  const results = [];
  for (let entry of db.users) {
    entry = await createIfNotExist(
      strapi,
      "plugin::users-permissions.user",
      entry
    );
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createMarch1stUsersIfNotExists = async (strapi) => {
  strapi.log.debug("Creating March1st users");
  const results = [];
  for (let entry of db.march1stUsers) {
    entry = await createIfNotExist(
      strapi,
      "api::march1st-user.march1st-user",
      entry
    );
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createCompaniesIfNotExists = async (strapi) => {
  strapi.log.debug("Creating companies");
  const results = [];
  for (let entry of db.companies) {
    entry = await createIfNotExist(strapi, "api::company.company", entry);
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createCompanyUsersIfNotExists = async (strapi) => {
  strapi.log.debug("Creating company users");
  const results = [];
  for (let entry of db.companyUsers) {
    entry = await createIfNotExist(
      strapi,
      "api::company-user.company-user",
      entry
    );
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createHackersIfNotExist = async (strapi) => {
  strapi.log.debug("Creating hackers");
  const results = [];
  for (let entry of db.hackers) {
    entry = await createIfNotExist(strapi, "api::hacker.hacker", entry);
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createProgramsIfNotExist = async (strapi) => {
  strapi.log.debug("Creating programs");
  const results = [];
  for (let entry of db.programs) {
    entry = await createIfNotExist(strapi, "api::program.program", entry);
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createSubmissionsIfNotExist = async (strapi) => {
  strapi.log.debug("Creating submissions");
  const results = [];
  for (let entry of db.submissions) {
    entry = await createIfNotExist(strapi, "api::submission.submission", entry);
    if (entry) results.push(entry);
  }
  return results;
};

module.exports.createSubmissionStatusesIfNotExist = async (strapi) => {
  strapi.log.debug("Creating submission statuses");
  const results = [];
  for (let entry of db.submissionStatuses) {
    entry = await createIfNotExist(
      strapi,
      "api::submission-status.submission-status",
      entry
    );
    if (entry) results.push(entry);
  }
  return results;
};

/**
 * Executes a query to DB and returns result. Accepts two parameters:
 * - @param {*} strapi Strapi object
 * - @param {*} serviceUID a uid string in the "api::apiname.content-type-name" format
 * - @param {*} payload data to create
 */
async function createIfNotExist(strapi, serviceUID, payload) {
  try {
    const exist = await strapi.entityService.findOne(serviceUID, payload.id);
    if (!exist) {
      const entry = await strapi.entityService.create(serviceUID, {
        data: payload,
      });
      return entry;
    }
  } catch (error) {
    console.log(error);
  }
}
