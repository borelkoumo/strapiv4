'use strict';
const { promisify } = require('util')
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')
const { sanitize } = require('@strapi/utils');
const { defaultPermissions } = require('../../../seeders/defaultPermissions')
const { enablePermissions } = require('../../../seeders/enablePermissions')


/**
 * A set of functions called "actions" for `custom/userdata`
 */
let cachedKey = undefined

async function getUserPersmissions(userId) {
  const user = await strapi.query("plugin::users-permissions.user").findOne({
    where: { id: userId },
    populate: ["role", "company_user", "hacker", "march1st_user"],
  });
  if (!user) {
    console.log("User not found. ID = ", userId)
    return {}
  }
  const roleType = user.role.type;

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
  console.log('Permissions : ', permissions)
  return permissions
}

module.exports = () => ({
  async getLocaldate(ctx,next){
    ctx.body = {date:new Date()}
  },
  async getUserdata(ctx, next) {
    const { id } = ctx.query;
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id },
      populate: ["role", "company_user", "hacker", "march1st_user"],
    });
    if (!user) {
      console.log("User not found. ID = ", id)
      return
    }
    const roleType = user.role.type;

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
    ctx.body = { user, permissions };
  },

  async doSignUpClient(ctx, next) {
    const {
      username,
      email,
      companyName,
      fullName,
      title
    } = ctx.request.body;
    console.log("doSignUpClient/ctx.request.body = ", JSON.stringify(ctx.request.body, null, 2));

    // Get role ID
    let clientRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: "program_super_admin" },
      });


    if (clientRole) {
      const { user: userService } = strapi.plugins['users-permissions'].services;
      const nombreUsers = await strapi.db
        .query("plugin::users-permissions.user")
        .count({});
      try {
        // Create User
        const userData = {
          id: nombreUsers + 1,
          username,
          email,
          provider: 'local',
          password: "TestTest@Test.com2022",
          role: clientRole.id,
          blocked: false,
          confirmed: true
        }
        console.log('userData == ', userData)
        const user = await userService.add(userData)
        console.log('user == ', user)

        // Create Company
        const nombreCompanies = await strapi.db
          .query("api::company.company")
          .count({});
        const companyData = {
          id: nombreCompanies + 1,
          company_name: companyName,
          address: "",
          company_size: 0,
          company_logo: ""
        }
        const company = await strapi.entityService.create("api::company.company", {
          data: companyData,
        });

        // Create CompanyUser
        const nombreCompanyUsers = await strapi.db
          .query("api::company-user.company-user")
          .count({});
        const companyUserData = {
          id: nombreCompanyUsers + 1,
          first_name: fullName,
          last_name: "",
          title: title,
          profile_picture_url: "",
          user: userData.id,
          company: company.id
        }
        const companyUser = await strapi.entityService.create("api::company-user.company-user", {
          data: companyUserData,
        });
        
        ctx.body = {
          status: "OK",
          data: {
            user,
            company,
            companyUser
          }
        }
      } catch (error) {
        console.log(error)
        return ctx.badRequest(error.message);
      }
    } else {
      return ctx.badRequest("Client role not found");
    }
  },

  async doSignUpHacker(ctx, next) {
    const {
      username,
      email,
      fullName
    } = ctx.request.body;
    console.log("doSignUpHacker/ctx.request.body = ", JSON.stringify(ctx.request.body, null, 2));

    // Get role ID
    let hackerRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: "hacker" },
      });


    if (hackerRole) {
      const { user: userService } = strapi.plugins['users-permissions'].services;
      const nombreUsers = await strapi.db
        .query("plugin::users-permissions.user")
        .count({});
      try {
        // Create User
        const userData = {
          id: nombreUsers + 1,
          username,
          email,
          role: hackerRole.id,
          provider: 'local',
          password: "TestTest@Test.com2022",
          blocked: false,
          confirmed: true
        }
        console.log('userData == ', userData)
        const user = await userService.add(userData)
        console.log('user == ', user)

        // Create Hacker
        const nombreHackers = await strapi.db
          .query("api::hacker.hacker")
          .count({});
        const hackerData = {
          id: nombreHackers + 1,
          first_name: fullName,
          last_name: "",
          phone: "",
          //date_of_birth: "01/01/2000",
          adress: "",
          adress: "",
          country: "",
          city: "",
          nationality: "",
          identity_front: "",
          identity_back: "",
          profile_picture_url: "",
          profile_picture_url: "",
          linkedin_url: "",
          website_url: "",
          user: userData.id,
        }
        const hackerUser = await strapi.entityService.create("api::hacker.hacker", {
          data: hackerData,
        });
        console.log("hackerUser ===", hackerUser);
        ctx.body = {
          status: "OK",
          data: {
            user,
            hackerUser
          }
        }
      } catch (error) {
        console.log(error)
        return ctx.badRequest(error.message);
      }
    } else {
      return ctx.badRequest("Hacker role not found");
    }
  },

  async doLogin(ctx, next) {
    const { idToken } = ctx.request.body;
    const { jwt: jwtService } = strapi.plugins['users-permissions'].services;

    // Assume that request will fail
    let result = {}

    // Check parameters
    if (!idToken) {
      result = {
        isValid: false,
        errorMessage: 'ID token is missing',
      }
      ctx.body = { result }
      return
    }

    // Proceed verification of IdToken
    /**
     * https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
     * https://openid.net/developers/jwt/
     * https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-id-token.html
     *
     */
    // User Pool parameters
    // console.log("Proceess.env = ", process.env)
    const region = process.env.AWS_REGION
    const userPoolId = process.env.AWS_CLIENT_USER_POOL_ID

    // Verify user pool parameters
    if (!region) {
      result = {
        isValid: false,
        errorMessage: 'Env var AWS_REGION is missing',
      }
      ctx.body = { result }
      return
    }
    if (!userPoolId) {
      result = {
        isValid: false,
        errorMessage: 'Env var AWS_CLIENT_USER_POOL_ID is missing',
      }
      ctx.body = { result }
      return
    }

    // Cognito issuer
    const iss = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`

    /**
     * This function make an async call to download and store
     * the corresponding public JSON Web Key (JWK) for your user pool.
     * It is available as part of a JSON Web Key Set (JWKS).
     */
    const downloadAndStoreJWK = async () => {
      if (!cachedKey) {
        console.log('Downloading JWK ...')
        let url = `${iss}/.well-known/jwks.json`
        try {
          const publicKeys = await axios.get(url)
          console.log(`Public Keys : %s`, JSON.stringify(publicKeys.data.keys, null, 2))

          cachedKey = publicKeys.data.keys.reduce((agg, current) => {
            let myjwk = {
              kty: 'RSA',
              e: current.e,
              n: current.n,
            }
            const pem = jwkToPem(myjwk)
            agg[current.kid] = { instance: current, pem }
            return agg
          }, {})
          console.log('Cached keys = ', JSON.stringify(cachedKey, null, 2))
          return cachedKey
        } catch (error) {
          console.log('Unable to download JWK : ' + error.message)
        }
      } else {
        console.log('Using cached JWK')
        return cachedKey
      }
    }

    const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken))

    /**
     * Main body of verify claim
     */
    try {
      console.log('Verify claim invoqued for token = ', idToken)
      const tokenSections = idToken.split('.')
      if (tokenSections.length < 2) {
        throw new Error(`ID token is invalid. It must contain 3 parts separed by a comma`)
      }
      const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf-8')
      const header = JSON.parse(headerJSON)
      const keys = await downloadAndStoreJWK()
      const key = keys[header.kid]
      if (key === undefined) {
        throw new Error(`The provided kid is unknowm`, header.kid)
      }

      // Verify the Claims
      const claim = (await verifyPromised(idToken, key.pem))
      console.log(`Claim : `, JSON.stringify(claim, null, 2))

      const currentSeconds = Math.floor(new Date().valueOf() / 1000)
      if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
        // console.log(`Claim is expired or invalid`)
        throw new Error(`Claim is expired or invalid`)
      }
      if (claim.iss !== iss) {
        throw new Error(`Claim issuer is invalid`)
      }
      result = {
        isValid: true,
        errorMessage: '',
        ...claim,
      }
      console.log('Claim confirmed for ', claim.name)
      console.log('RESULT = %o', result)

      // Log in user
      const user = await strapi.query('plugin::users-permissions.user').findOne({
        where: { email: claim.email },
        populate: ["role", "company_user","company_user.company", "hacker", "march1st_user"],
      });

      if (!user) {
        return ctx.badRequest('wrong email');
      }
      if (user.blocked) {
        return ctx.badRequest('user blocked');
      }
      if (!user.confirmed) {
        return ctx.badRequest('user not confirmed');
      }

      // Sanitize the template's user information
      const userSchema = strapi.getModel('plugin::users-permissions.user');
      const sanitizedUserInfo = await sanitize.sanitizers.defaultSanitizeOutput(userSchema, user);

      let context;
      try {
        context = JSON.parse(claim.context);
      } catch (e) {
        context = {}
      }

      // Get user permissions
      const permissions = await getUserPersmissions(user.id)

      // Send response
      ctx.send({
        jwtStrapi: jwtService.issue({ id: user.id }),
        user: sanitizedUserInfo,
        permissions,
        context
      });
    } catch (error) {
      console.log('Error happened : %o', error.message)
      result = {
        isValid: false,
        errorMessage: error.message,
      }
      ctx.body = { result }
      return
    }
  },

});
