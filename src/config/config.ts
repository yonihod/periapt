import dotenv from 'dotenv';
dotenv.config()
import packageJson from '../../package.json';
import { Config } from '../types/config';

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const env: Config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,
    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env.PORT || 8080,
    clientOrigins: {
        'development': process.env['DEV_ORIGIN'] ?? '*',
        'production': process.env['PROD_ORIGIN'] ?? 'none'
    },
    jwtSecret:process.env['JWT_SECRET']??'*',
}

export default env