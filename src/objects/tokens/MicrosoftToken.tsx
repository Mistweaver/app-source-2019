export class MicrosoftToken {
	aud: string;
	iss: string;
	iat: string;
	nbf: string;
	aio: string;
	groups: string[];
	name: string;
	nonce: string;
	oid: string;
	preferred_username: string;
	roles: string[];
	sub: string;
	tid: string;
	uti: string;
	ver: string;

	constructor() {
		this.name = "";
	}
}