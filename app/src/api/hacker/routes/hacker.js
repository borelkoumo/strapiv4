"use strict";

/**
 * hacker router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::hacker.hacker");
