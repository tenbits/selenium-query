import { class_Dfr, DeferredLike } from 'atma-utils'

export function dfr_run (fn) : class_Dfr {
	return class_Dfr.run(fn) as class_Dfr;
};
