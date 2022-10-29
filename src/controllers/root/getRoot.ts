import { RequestHandler, type Request, type Response } from 'express'
import config from '../../config/config'

/**
 * Health check endpoint
 */
const health: RequestHandler = (req: Request, res: Response) => {
    res.status(200).json({
        name: config.name,
        description: config.description,
        version: config.version
    });
}

export default health