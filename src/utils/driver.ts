import { IDriver } from '../IDriver'
import { ILoadConfig, BuildStatics } from '../static/build'
import { dfr_run } from './dfr';
import { _when } from './async'

export function loadUrl (driver: IDriver, url: string, config: ILoadConfig): Promise<IDriver> {
    return driver
        .get(url)
        .then(() => driver, (error) => {
            return error;
            // if (error.code !== 100) {
            //     return error;
            // }
            // return BuildStatics
            //     .build(config)
            //     .then(driver => {
            //         return driver
            //             .get(url)
            //             .then(() => driver);
            //     });
        });
}

export function setCookies(driver: IDriver, url: string, config: ILoadConfig): Promise<undefined> {
    return <Promise<undefined>> <any> dfr_run((resolve, reject) => {
        let cookies = config.cookies;
        if (typeof cookies === 'string') {
            cookies = cookies.split(';').map(x => x.trim()).map(single => {
                let parts = single.split('=').map(x => x.trim());
                return { name: parts[0], value: parts[1] }
            });
        }
        let arr: any[] = cookies;

        let origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }

        loadUrl(driver, origin, config).then(driver => {

            let dfrs = arr.map(cookie => driver.manage().addCookie(cookie));

            _when(dfrs, () => {
                resolve();
            })
        })
    });
} 