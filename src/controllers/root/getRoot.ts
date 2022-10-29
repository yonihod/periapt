import { RequestHandler, type Request, type Response } from 'express'
import config from '../../config/config'
import path from 'path'

/**
 * Send client
 */
const health: RequestHandler = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    res.status(200).json({
        name: config.name,
        description: config.description,
        version: config.version
    });
}

export default health