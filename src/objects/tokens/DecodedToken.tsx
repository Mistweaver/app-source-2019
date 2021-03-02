import { User } from "../user/User";

export class DecodedToken {
	iss: string;
	exp: number;
	sub: string;
	aud: string;
	nbf: string;
	iat: string;
	jti: string;
	user: User;
}