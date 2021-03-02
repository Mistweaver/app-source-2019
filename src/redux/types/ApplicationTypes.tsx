import { User } from "../../objects/user/User";

export const SET_NEW_ACCESS_TOKEN = "SET_NEW_ACCESS_TOKEN";
export const SET_NEW_MSAL_TOKEN = "SET_NEW_MSAL_TOKEN";
export const CHANGE_PATH = "CHANGE_PATH";
export const UPDATE_PATH_OBJECT_ID = "UPDATE_PATH_OBJECT_ID";
export const GO_BACK = "GO_BACK";
export const LOAD_PATH_FROM_STORAGE = "LOAD_PATH_FROM_STORAGE";
export const UPDATE_OBJECT_ID = "UPDATE_OBJECT_ID";
export const LOAD_ACCOUNT = "LOAD_ACCOUNT";
export const LOGIN_EXPIRED = "LOGIN_EXPIRED";
export const LOGIN_RENEWED = "LOGIN_RENEWED";
export const LOGOUT = "LOGOUT";

export const LOAD_USER = "LOAD_USER";

interface SetNewAccessToken {
	type: typeof SET_NEW_ACCESS_TOKEN;
	payload: string;
}

interface SetNewMsalToken {
	type: typeof SET_NEW_MSAL_TOKEN;
	payload: string;
}

interface ChangePathAction {
	type: typeof CHANGE_PATH;
	payload: string;
}

interface GoBack {
	type: typeof GO_BACK;
}

interface LoadPathFromStorage {
	type: typeof LOAD_PATH_FROM_STORAGE;
}

interface UpdateObjectId {
	type: typeof UPDATE_OBJECT_ID;
	payload: { objectId: string };
}

interface UpdatePathObjectIdAction {
	type: typeof UPDATE_PATH_OBJECT_ID;
	payload: { path: string, objectId: string};
}

interface LoadAccount {
	type: typeof LOAD_ACCOUNT;
	payload: {
		account: any
	}
}

interface LoginExpired {
	type: typeof LOGIN_EXPIRED;
}

interface Logout {
	type: typeof LOGOUT;
}

interface LoadUser {
	type: typeof LOAD_USER;
	payload: User;
}


export type ApplicationActionTypes = LoadUser | Logout | LoadAccount | LoginExpired | UpdateObjectId | SetNewAccessToken | SetNewMsalToken | ChangePathAction | UpdatePathObjectIdAction | GoBack | LoadPathFromStorage;