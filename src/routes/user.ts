import express from 'express'
import z, {ZodError} from 'zod'
import { genereteToken } from '../helper/jwt/jwtHelper'
import logger from '../logger/logger'

const userSchema = z.object({
    userName: z.string(),
    language: z.string(),
})

const userRouter = express.Router()

// POST
userRouter.post('/', (req, res) => {
    try {
        const {userName, language} = userSchema.parse(req.body);
        const token = genereteToken(userName, language);
        res.status(200).json({token});
    } catch (err) {
        const message = (err as ZodError).issues[0].message
        logger.error(message)
        res.status(400).json({ message: 'Invalid user object' })
    }
})



export default userRouter