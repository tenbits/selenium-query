import * as cheerio from 'cheerio'

export const CheerioUtils = {
    fromHtml (html: string) {
        let $ = cheerio(html);
        let el: any = $;
        return el;
    }
}