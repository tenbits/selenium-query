import { WebDriver, WebElement } from 'selenium-webdriver';

// export interface IDriver {
//     executeScript<T>(script: string | Function, ...var_args: any[]): Promise<T>;
//     executeAsyncScript<T>(script: string | Function, ...var_args: any[]): Promise<T>;

//     get (url: string): Promise<any>
//     manage (): IDriverManager

//     getCurrentUrl (): Promise<string>
//     getPageSource (): Promise<string>
// }

export type IDriver = WebDriver;
export interface IDriverManager {
    addCookie (cookie: any): Promise<void>;
}

export interface IThenableDriver extends Promise<any>, IDriver {

}



// export interface IElement extends WebElement {
//     getDriver(): IDriver

//     sendKeys (str: string)
//     click(): Promise<void>

//     getCssValue (name: string): Promise<any>
//     getAttribute (name: string): Promise<any>

//     findElements({ css: string });
// }

export type IElement = WebElement;
