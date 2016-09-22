// Production specific configuration
// =================================
export default {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOURI || 'mongodb://your_server/koa2-starter',
  },

  // Redis settings
  redis: {
    host: 'your_server',
    port: 6379,
    db: 0,
  },

};
