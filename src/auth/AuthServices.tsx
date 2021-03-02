import decode from 'jwt-decode';
import { MicrosoftToken } from '../objects/tokens/MicrosoftToken';
import { DecodedToken } from '../objects/tokens/DecodedToken';
import { DecodedMsalToken } from '../objects/tokens/DecodedMsalToken';
import { DecodedAccessToken } from '../objects/tokens/DecodedAccessToken';

export function getMsalIDToken() {
	return localStorage.getItem('msal.idtoken') || ""
}

export function clearTokens() {
	localStorage.removeItem('msal.idtoken');
}

export function getMicrosoftProfile() {
	// console.log("TOKEN DECODE");
	const decoded: MicrosoftToken = decode(localStorage.getItem('msal.idtoken') || "")
	return decoded;
}

export function currentTokenExpiration() {
	try {
		const decoded: DecodedToken = decode(localStorage.getItem('msal.idtoken') || "");
		return new Date(decoded.exp*1000);
	} catch (err) { return 0; }
}

export function currentTokenExpirationRaw() {
	try {
		const decoded: DecodedToken = decode(localStorage.getItem('msal.idtoken') || "");
		return decoded.exp*1000;
	} catch (err) { return 0; }
}

export function getAccessTokenExpiration(token: string) {
	try {
		const decoded: DecodedToken = decode(token);
		return decoded.exp * 1000;
	} catch (err) { return 0; }
}

export function isTokenExpired() {
	try {
		const decoded: DecodedToken = decode(localStorage.getItem('msal.idtoken') || "");
		if (decoded.exp < Date.now() / 1000) { // Checking if token is expired
			return true;
		}
		else { return false; }
	} catch (err) { return false; }
}

export function checkAccessTokenExpiration(token: string) {
	try {
		const decoded: DecodedAccessToken = decode(token);
		if (decoded.exp < Date.now() / 1000) { // Checking if token is expired
			return true;
		}
		else { return false; }
	} catch (err) { return false; }
}

export function checkIdTokenExpiration(token: string) {
	try {
		const decoded: DecodedMsalToken = decode(token);
		if (decoded.exp < Date.now() / 1000) { // Checking if token is expired
			return true;
		}
		else { return false; }
	} catch (err) { return false; }
}

export function decodeIdToken(token: string) {
	try {
		const decoded: DecodedMsalToken = decode(token);
		return decoded;
	} catch (err) {
		console.log("Error decoding id token: " + err);
		return new DecodedMsalToken();
	}
}

export function decodeAccessToken(token: string) {
	try {
		const decoded: DecodedAccessToken = decode(token);
		return decoded;
	} catch (err) {
		console.log("Error decoding access token: " + err);
		return new DecodedAccessToken();
	
	}

}