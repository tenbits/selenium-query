import * as seleniumDriver from 'selenium-webdriver'
import { IDriver } from './IDriver';

let _driver: IDriver = <any> seleniumDriver as IDriver;


export  function useDriver (name: 'selenium' | 'pupperteer') {
    switch (name) {
        case 'selenium':
            _driver = <any> seleniumDriver as IDriver;
            return;
        case 'pupperteer':
            throw new Error('Unsupported');
    }
}

export const refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};