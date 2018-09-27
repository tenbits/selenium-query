
export interface IDriver {
    executeScript<T>(script: string, ...var_args: any[]): Promise<T>;
    executeAsyncScript<T>(script: string, ...var_args: any[]): Promise<T>;

    get (url: string): Promise<any>
    getCurrentUrl (): Promise<string>
    manage (): IManagableDriver
}

export interface IManagableDriver {
    addCookie (cookie: any): Promise<void>;
}

export interface IThenableDriver extends Promise<any>, IDriver {
    
}



export interface IElement {
    getDriver(): IDriver

    sendKeys (str: string)
    click(): Promise<void>

    getCssValue (name: string): Promise<any>
    getSize(): Promise<{ width: number, height: number }>
    getAttribute (name: string): Promise<any>

    findElements({ css: string });    
}