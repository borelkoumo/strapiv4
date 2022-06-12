'use strict';

/**
 * hacker service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hacker.hacker');
