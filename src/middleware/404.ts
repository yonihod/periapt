import { RequestHandler, type Response, type Request } from 'express'

/**
 * JSON 404 response
 */
const _404: RequestHandler = (req: Request, res: Response) => {
    return res.status(404).json({ message: 'not found' })
}

export default _404