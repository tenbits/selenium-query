
export interface IDriver extends Promise<IDriver> {
    executeScript<T>(script: string, ...var_args: any[]): Promise<T>;

    get (url: string): IDriver
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