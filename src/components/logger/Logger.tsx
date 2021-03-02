export const DEBUG = "DEBUG";
export const INFO = "INFO";
export const WARN = "WARN";
export const ERROR = "ERROR";

type LOGTYPES = "DEBUG" | "INFO" | "WARN" | "ERROR";

export function Logger(
	componentName: string,
	dataName: string,
	logData: any,
	logLevel: LOGTYPES
) {
	if(process.env.NODE_ENV  === 'development') {
		// log any debug or info in development
		console.log(logLevel + ": " + componentName + ", Data: " + dataName);
		console.log(logData);
	} else {	
		// only log warnings and errors in production
		if(logLevel === WARN || logLevel === ERROR) {
			console.log(logLevel + ": " + componentName + ", Data: " + dataName);
			console.log(logData);
		}
	}
}


