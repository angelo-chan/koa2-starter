import moogoose from 'mongoose';
import _ from 'lodash';
import crypto from 'crypto';
import Promise from 'bluebird';

/**
 * Get boolean
 * @param value
 */
export function getBoolean(value) {
  if (value && value.toLowerCase() === 'true') {
    return true;
  } else if (value && value.toLowerCase() === 'false') {
    return false;
  }
  return undefined;
}

/**
 * Validate object id
 * @param id
 * @returns {boolean}
 */
export function isObjectId(id) {
  if (moogoose.Types.ObjectId.isValid(id)) {
    return true;
  }
  return false;
}

/**
 * Validate object id list
 * @param ids
 */
export function allObjectIds(ids) {
  return _.every(ids, isObjectId);
}

/**
 * Merge customizer that will replace the whole array instead of merge
 * @param objValue
 * @param srcValue
 * @returns {*}
 */
export function mergeCustomizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue;
  }
  return undefined;
}

/**
 * Encrypt password
 * @param password
 * @param salt
 * @returns {*}
 */
export function encryptPassword(password, salt) {
  if (!password) {
    return Promise.reject(null);
  }
  const defaultIterations = 10000;
  const defaultKeyLength = 64;
  const digest = 'sha512';
  const saltBuf = new Buffer(salt, 'base64');
  return Promise.promisify(crypto.pbkdf2)(password, saltBuf, defaultIterations, defaultKeyLength, digest)
    .then(key => key.toString('base64'));
}

/**
 * Make salt
 * @returns {Promise.<TResult>|Promise|*}
 */
export function makeSalt() {
  const byteSize = 16;
  return Promise.promisify(crypto.randomBytes)(byteSize)
    .then(salt => salt.toString('base64'));
}

/**
 * Validate presence of
 * @param value
 * @returns {*}
 */
export function validatePresenceOf(value) {
  return value && value.length;
}
