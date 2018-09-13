
export interface IDriver extends PromiseLike<IDriver> {
    executeScript<T>(script: string, ...var_args: any[]): Promise<T>;

    get (url: string): IDriver
}
export interface IElement {
    getDriver(): IDriver

    sendKeys (str: string)
    click(): Promise<void>
}