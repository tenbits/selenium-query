import alot = require('alot');

export class FormDataBase {
    dict = Object.create(null)

    append (key, value): this {
        this.dict[key] = value;
        return this;
    }

    entries () {
        return alot
            .fromObject(this.dict).map(x => [x.key, x.value] as [string, any])
            .toArray();
    }
}
