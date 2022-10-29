import express from 'express'
import { ArticleGet } from '../controllers/introduction/getArticle'
import z, {ZodError} from 'zod'

//allow only letters numbers hyphen and underscore
const articleNameSchema = z.string().regex(/^[a-zA-Z0-9-_]+$/, {message: 'Article name can only contain letters, numbers, hyphen and underscore'});


const articleRouter = express.Router()
// GET
articleRouter.get('/:articleName', (req,res,next)=>{
    const input = req.params.articleName;
    try {
        articleNameSchema.parse(input);
        //we allow hyphen but wikipedia does not, so we replace it with underscore
        req.params.articleName = input.replace(/-/g, '_');
        next();
    }catch(err){
        const message = (err as ZodError).issues[0].message;
        res.status(400).json({message});
    }
}, ArticleGet )

export default articleRouter