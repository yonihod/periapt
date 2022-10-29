import wiki, { type wikiSummary, type summaryError } from 'wikipedia';

type ArticleResult = {
    introduction: string,
    scrapeDate: number,
    articleName: string
}

export default class Article {
    articles: Map<string, ArticleResult> = new Map();

    getArticle = async (name: string, lang: string | null): Promise<ArticleResult> => {
        // check if we have the article in cache
        const result = this.articles.get(name);
        if (result) {
            return result;
        }
        try {
            if (lang && lang != 'en-US')
                wiki.setLang(lang);
            const summary: wikiSummary = await wiki.summary(name);
            const { extract: introduction, title: articleName } = summary;
            
            const result =  {
                scrapeDate: Date.now(),
                articleName,
                introduction
            }
            // save to cache for 5 minutes (would implement this with redis)
            this.articles.set(name, result);
            setTimeout(() => {
                this.articles.delete(name);
            }, 5 * 60 * 1000);

            return result;
        } catch (err) {
            const { message }: summaryError = (err as summaryError);
            throw new Error(message);
        }

    }
}