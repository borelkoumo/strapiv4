"use strict";
const seeders = require("./seeders/seed");
const { enablePermissions } = require("./seeders/enablePermissions");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    /**
     * run strapi services:list to know all services
     */
    strapi.log.debug("Bootstraping march1st backend");

    const roles = await seeders.createRolesIfNotExist(strapi);
    console.log("Roles = ", roles);

    const apiUsers = await seeders.createUsersIfNotExists(strapi);
    console.log("Users = ", apiUsers);

    const m1Users = await seeders.createMarch1stUsersIfNotExists(strapi);
    console.log("M1 Users = ", m1Users);

    const companies = await seeders.createCompaniesIfNotExists(strapi);
    console.log("Companies = ", companies);

    const companyUsers = await seeders.createCompanyUsersIfNotExists(strapi);
    console.log("Company users = ", companyUsers);

    const hackers = await seeders.createHackersIfNotExist(strapi);
    console.log("Hackers = ", hackers);

    const programs = await seeders.createProgramsIfNotExist(strapi);
    console.log("Programs = ", programs);

    const submissions = await seeders.createSubmissionsIfNotExist(strapi);
    console.log("Submissions = ", submissions);

    const subStat = await seeders.createSubmissionStatusesIfNotExist(strapi);
    console.log("Submission statuses = ", subStat);
    /**
     * Enable permissions
     */
    const permissions = await enablePermissions(strapi);
    console.log("Enabled permissions = ", permissions.filter(p => p.permission !== undefined));
  },
};
