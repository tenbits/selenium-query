import { refs } from '../global'
import { IDriver } from '../IDriver';

export const ConfigStatics = {
	setDriver (driver: IDriver ) {
		refs.driver = driver;
	},
	getDriver (): IDriver {
		return refs.driver;
	}
};