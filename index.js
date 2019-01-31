// require new relic at the top only in production environment
const config = require('config');
const path = require('path');

const server = require('./server');
const plugins = require('./server/plugins');
const logger = require('./server/utils/logger');
const { sequelize } = require('./server/models');

global.tempFolder = path.join(path.resolve(__dirname), 'temp');

function gracefulStopServer() {
  server.stop({ timeout: 10 * 1000 }, () => {
    logger.info('Shutting down server');
    process.exit(0);
  });
}

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    promise,
    reason,
  }, 'unhandledRejection');
  process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

/**
 * Starts the server
 * @returns {Promise.<void>}
 */
async function startServer() {
  try {
    await sequelize.sync({
      force: false,
    });
    await server.register(plugins);
    await server.start();
    logger.info(`server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

startServer();
