import server from './server'
import config from './config/config'
import logger from './logger/logger'

server.listen(config.port, () => {
    logger.info(`🚀 ${config.name} ${config.version} 🚀`)
    logger.info(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
})