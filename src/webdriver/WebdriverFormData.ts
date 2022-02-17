import { IElement } from '../common/IDriver';
import { IQuery } from '../common/IQuery';

type TFormDataFile = {
    file: string
};

export class WebdriverFormData {
    protected constructor (public $: IQuery, public form: IElement, public formId: string) {

    }

    async append (name: string, value: string | number | TFormDataFile): Promise<this> {
        if (value == null) {
            return this;
        }

        let isFile = typeof value === 'object' && 'file' in value;
        let _type = isFile ? 'file' : null;
        let _value = isFile ? null : value;

        let input: IElement = await this.$.eval(function () {
            let form: HTMLFormElement = arguments[0];
            let name = arguments[1];
            let type = arguments[2];
            let value = arguments[3];
            let input = document.createElement('input');
            input.setAttribute('name', name);
            if (type != null) {
                input.setAttribute('type', type);
            }
            if (value != null) {
                input.setAttribute('value', value);
            }

            form.appendChild(input);
            return input;
        }, this.form, name, _type, _value);


        if (isFile) {
            await input.sendKeys((value as TFormDataFile).file);
        }

        return this;
    }

    static async create ($: IQuery): Promise<WebdriverFormData> {
        let formId = `${Date.now()}_${Math.round(Math.random() * 10_000)}`;
        let form: IElement = await $.eval(function () {
            let formId = arguments[0];
            let form = document.createElement('form');
            form.setAttribute('style', 'display: none');
            form.setAttribute('id', formId);
            document.body.appendChild(form);
            return form;
        }, formId);
        return new WebdriverFormData($, form, formId);
    }
}
