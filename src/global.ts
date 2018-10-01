import * as seleniumDriver from 'selenium-webdriver'
import { IDriver } from './common/IDriver';

let _driver: IDriver;


export const refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};