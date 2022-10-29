import { RequestHandler, type Request, type Response } from 'express'
import Article from '../../models/Article';

const article = new Article();
/**
 * Get article from wikipedia by article name
 */
export const ArticleGet: RequestHandler = async (req: Request, res: Response) => {
    try {
        const input: string = req.params.articleName;
        let lang = null;
        
        // @ts-ignore
        if(req.decoded){
            // @ts-ignore
            lang = req.decoded.language;
        }
        else if(req.headers['Accept-language']){
            lang = (req.headers['Accept-language'] as string);
        }

        const result = await article.getArticle(input, lang);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({message: (err as Error).message});
    }
 
}
