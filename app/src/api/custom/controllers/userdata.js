'use strict';
const { promisify } = require('util')
const axios = require('axios')
const jsonwebtoken = require('jsonwebtoken')
const jwkToPem = require('jwk-to-pem')

/**
 * A set of functions called "actions" for `custom/userdata`
 */
let cachedKey = undefined

module.exports = {
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

  async doLoginClient(ctx, next) {
    const { idToken } = ctx.query;
    console.log('Ctx body', JSON.stringify(ctx.body, null, 2))
    console.log('Ctx query = ', JSON.stringify(ctx.query, null, 2))

    // Assume that request will fail
    let result = {}
    // export interface ClaimVerifyResult {
    //   readonly userName?: string
    //   readonly clientId?: string
    //   readonly isValid: boolean
    //   readonly errorMessage: string
    // }

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
    const region = Env.get('AWS_REGION')
    const userPoolId = Env.get('AWS_CLIENT_USER_POOL_ID')

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
            const pem = jwkToPem.default(myjwk)
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
        // console.log(`Claim issuer is invalid`)
        throw new Error(`Claim issuer is invalid`)
      }
      result = {
        isValid: true,
        errorMessage: '',
        ...claim,
      }
      console.log('Claim confirmed for %s', claim.name)
      console.log('RESULT = %o', result)

      ctx.body = { result }
    } catch (error) {
      console.log('Error happened : %o', error.message)
      result = {
        isValid: false,
        errorMessage: 'Env var AWS_CLIENT_USER_POOL_ID is missing',
      }
      ctx.body = { result }
      return
    }
  }
};
