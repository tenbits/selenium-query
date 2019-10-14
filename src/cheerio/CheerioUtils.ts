import * as cheerio from 'cheerio'

export const CheerioUtils = {
    fromHtml (html: string): Cheerio {
        let $ = (<any>cheerio)(html, void 0, void 0, { xml: { decodeEntities: false } });
        let el: any = $;
        return el;
    },
    fromNode (el: CheerioElement): Cheerio {
        return (<any>cheerio)(el, void 0, void 0, { xml: { decodeEntities: false } });
    }
}