import { Strategy as JWTStrategy } from 'passport-jwt';
import config from '../../config/environment';
import { getJSON, setJSON } from '../../components/cache';
import User from '../../models/user.model';
import { AUTH_HEADER, CACHE_USER_PREFIX, CACHE_USER_EXPIRESIN } from '../../components/constants';

const extractAuthToken = (request) => {
  let token = null;
  if (request.headers && request.headers[AUTH_HEADER]) {
    const parts = request.headers[AUTH_HEADER].split(' ');
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  return token;
};

const opts = {
  jwtFromRequest: extractAuthToken,
  secretOrKey: config.jwt.secret,
};

export default new JWTStrategy(opts, async(payload, done) => {
    try {
      const id = payload._id;
      const key = `${CACHE_USER_PREFIX}:${id}`;
      const found = await getJSON(key);
      if (found) {
        done(null, found);
      } else {
        const user = await User.findById(id).select('username type stage').exec();
        if (user) {
          const info = user.info;
          setJSON(key, info, CACHE_USER_EXPIRESIN);
          done(null, info);
        } else {
          done(null, false);
        }
      }
    } catch (error) {
      done(error);
    }
  }
);
