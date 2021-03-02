import { User } from "../../objects/user/User";
import { ApplicationActionTypes, CHANGE_PATH, UPDATE_PATH_OBJECT_ID, GO_BACK, LOAD_PATH_FROM_STORAGE, SET_NEW_ACCESS_TOKEN, SET_NEW_MSAL_TOKEN, UPDATE_OBJECT_ID, LOAD_ACCOUNT, LOGOUT, LOAD_USER } from "../types/ApplicationTypes";

export function updateAccessToken(newToken: string): ApplicationActionTypes {
	return {
		type: SET_NEW_ACCESS_TOKEN,
		payload: newToken
	}
}

export function updateMsalToken(newToken: string): ApplicationActionTypes {
	return {
		type: SET_NEW_MSAL_TOKEN,
		payload: newToken
	}
}

export function updatePath(newPath: string): ApplicationActionTypes {
	return {
		type: CHANGE_PATH,
		payload: newPath
	}
}

export function goBack(): ApplicationActionTypes {
	return {
		type: GO_BACK
	}
}

export function loadPathFromStorage(): ApplicationActionTypes {
	return {
		type: LOAD_PATH_FROM_STORAGE
	}
}

export function updatePathWithObject(newPath: string, objectId: string): ApplicationActionTypes {
	return {
		type: UPDATE_PATH_OBJECT_ID,
		payload: { path: newPath, objectId: objectId }
	}
}

export function updateObjectId(objectId: string): ApplicationActionTypes {
	return {
		type: UPDATE_OBJECT_ID,
		payload: { objectId: objectId }
	}
}

export function loadAccount(account: any): ApplicationActionTypes {
	return {
		type: LOAD_ACCOUNT,
		payload: {
			account: account
		}
	}
}

export function loadUser(user: User): ApplicationActionTypes {
	return {
		type: LOAD_USER,
		payload: user
	}
}

export function logout(): ApplicationActionTypes {
	return {
		type: LOGOUT
	}
}