import { MicrosoftToken } from "../objects/tokens/MicrosoftToken";
import { getMicrosoftProfile } from "./AuthServices";

/**
 * Access control functions to determine if a component should render.  This should not be substituted as a form of security.
 * All API routes should be secured on the server.
 */

export function checkIfDev() {
	let accessGranted = false;
	let microsoftProfile: MicrosoftToken = getMicrosoftProfile();
	microsoftProfile.roles.forEach(role => {
		if (role === "DEV") {
			accessGranted = true;
		} 
	});
	return accessGranted;
	
}

export function checkIfAdmin() {
	let accessGranted = false;
	let microsoftProfile: MicrosoftToken = getMicrosoftProfile();
	microsoftProfile.roles.forEach(role => {
		if (checkIfDev() || role === "ADMIN") {
			accessGranted = true;
		} 
	});
	return accessGranted;
}
