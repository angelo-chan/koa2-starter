import passport from 'koa-passport';
import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/environment';
import jwtStrategy from './strategies/jwt';
import localStrategy from './strategies/local';
import { ACCESS_TOKEN, TOKEN_TYPE, AUTH_HEADER } from '../components/constants';

passport.use('jwt', jwtStrategy);
passport.use('local', localStrategy);

/**
 * generate a jwt token signed by secret
 * @param ctx
 * @param payload
 * @param expires
 * @returns {*}
 */
export function signToken(ctx, payload, expires) {
  const expiresIn = expires || config.jwt.expiresInSeconds;
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn });
  if (process.env.NODE_ENV !== 'production') {
    ctx.cookies.set(ACCESS_TOKEN, token, { httpOnly: true, expires: moment().add(expiresIn, 's').toDate() });
  }
  ctx.body = { token, token_type: TOKEN_TYPE, expires_in: expiresIn };
}

async function resolveAuthorizationHeader(ctx, next) {
  const credentials = ctx.headers && ctx.headers[AUTH_HEADER];
  let option = credentials;
  if (!option && ctx.query[ACCESS_TOKEN]) {
    option = ctx.query[ACCESS_TOKEN];
  }
  if (!option && ctx.cookies.get(ACCESS_TOKEN)) {
    option = ctx.cookies.get(ACCESS_TOKEN);
  }
  if (!credentials && option) {
    ctx.headers[AUTH_HEADER] = `Bearer ${option}`;
  }
  await next();
}

/**
 * validate jwt
 * @returns {*}
 */
export function isAuthenticated() {
  return compose([resolveAuthorizationHeader, passport.authenticate('jwt', { session: false })]);
}

/**
 * authenticate user
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function authLocal(ctx, next) {
  const promise = new Promise((resolve) => {
    passport.authenticate('local', { session: false }, (user, info) => {
      if (user) {
        signToken(ctx, user);
      } else if (info) {
        ctx.status = 401;
        ctx.body = info;
      }
      resolve(true);
    })(ctx, next);
  });
  await promise;
}

export default () => passport.initialize();

