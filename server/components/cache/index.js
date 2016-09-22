import redis from './redis';
import logger from '../../components/logger';

/**
 * Get a json object by key. Return null if not exist.
 * @param key
 * @returns {Promise.<TResult>|Promise|*}
 */
export function getJSON(key) {
  return redis.get(key).then(value => {
    if (!value) {
      logger.debug('CACHE - no cache found for key %s', key);
      return null;
    }
    logger.debug('CACHE - found cache for key %s : %s', key, value);
    return JSON.parse(value);
  });
}

/**
 * Cache a json object.
 * @param key
 * @param value
 * @param expiresIn
 */
export function setJSON(key, value, expiresIn) {
  const str = JSON.stringify(value);
  if (!expiresIn) {
    logger.debug('CACHE - save cache for key %s : %s ', key, str);
    redis.set(key, str);
  } else {
    logger.debug('CACHE - save cache for key %s : %s expires in %s', key, str, expiresIn);
    redis.setex(key, expiresIn, str);
  }
}

/**
 * Get string value by key.
 * @param key
 * @returns {Promise|Promise.<TResult>|*}
 */
export function get(key) {
  return redis.get(key).then(value => {
    if (!value) {
      logger.debug('CACHE - no cache found for key %s', key);
      return null;
    }
    logger.debug('CACHE - found cache for key %s : %s', key, value);
    return value;
  });
}

/**
 * Cache a string value.
 * @param key
 * @param value
 * @param expiresIn
 */
export function set(key, value, expiresIn) {
  if (!expiresIn) {
    logger.debug('CACHE - save cache for key %s : %s ', key, value);
    redis.set(key, value);
  } else {
    logger.debug('CACHE - save cache for key %s : %s expires in %s', key, value, expiresIn);
    redis.setex(key, expiresIn, value);
  }
}

/**
 * Check the key exists or not
 * @param key
 */
export function exists(key) {
  return redis.exists(key);
}

/**
 * List all keys by pattern.
 * @param pattern
 * @returns {*|Iterator.<number>}
 */
export function keys(pattern) {
  return redis.keys(pattern);
}


/**
 * Delete keys by pattern.
 * @param prefix
 */
export function delByPattern(pattern) {
  redis.keys(pattern).then(matchKeys => {
    const count = matchKeys.length;
    if (count) {
      logger.debug('CACHE - got %s keys by pattern: %s ', count, pattern);
      redis.del(matchKeys);
      return count;
    }
    logger.debug('CACHE - got %s keys by pattern: %s ', 0, pattern);
    return 0;
  }).catch(err => {
    logger.error(err);
  });
}

/**
 * Delete a cache by key.
 * @param key
 */
export function del(key) {
  logger.debug('CACHE - delete cache for key %s', key);
  redis.del(key);
}

export default redis;
