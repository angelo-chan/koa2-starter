import convert from 'koa-convert';
import compose from 'koa-compose';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import morgan from 'koa-morgan';
import serve from 'koa-static';
import path from 'path';
import { stream } from '../components/logger';
import config from '../config/environment';

const corsConfig = () => {
  const accessControlAllowMethods = [
    'OPTIONS',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'HEAD',
  ];

  const accessControlAllowHeaders = [
    'X-Requested-With',
    'If-Modified-Since',
    'Cache-Control',
    'DNT',
    'X-CustomHeader',
    'Keep-Alive',
    'User-Agent',
    'Content-Type',
    'Authorization',
    'Pragma',
    'X-Real-IP',
    'X-Forwarded-For',
    'Host',
    'X-NginX-Proxy',
    'Connection',
  ];

  return {
    origin: true,
    methods: accessControlAllowMethods,
    headers: accessControlAllowHeaders,
    expose: 'Authorization',
    maxAge: 1200,
    credentials: true,
  };
};

export default function () {
  const env = process.env.NODE_ENV;

  const middleware = [];

  // logger
  let format = ':remote-addr :method :url :status :response-time ms ":referrer" ":user-agent"';
  if (env === 'development') {
    format = 'dev';
  }
  middleware.push(morgan(format, { stream }));

  // cors
  if (config.cors) {
    middleware.push(convert(cors(corsConfig())));
  }

  // static path
  if (env !== 'production') {
    middleware.push(serve(path.join(config.root, 'static')));
  }

  // body parser
  middleware.push(bodyParser());

  return compose(middleware);
}
