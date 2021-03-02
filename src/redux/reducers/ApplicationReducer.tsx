import { User } from "../../objects/user/User";
import { ApplicationActionTypes, CHANGE_PATH, UPDATE_PATH_OBJECT_ID, GO_BACK, LOAD_PATH_FROM_STORAGE, SET_NEW_ACCESS_TOKEN, SET_NEW_MSAL_TOKEN, UPDATE_OBJECT_ID, LOAD_ACCOUNT, LOGIN_EXPIRED, LOGOUT, LOAD_USER } from "../types/ApplicationTypes";

function application(
	state = {
		path: "",
		pathObjectId: "",
		history: [],

		msalIdToken: "",
		accessToken: "",
		loggedIn: false,
		account: null,

		user: new User()
	},
	action: ApplicationActionTypes
) {
	// console.log("REDUCER ACTION");
	// console.log(action);
	switch(action.type) {
		case LOAD_ACCOUNT:
			return Object.assign({}, state, {
				account: action.payload.account,
				loggedIn: true
			});
		case LOGIN_EXPIRED:
			return Object.assign({}, state, {
				loggedIn: false
			});
		case LOAD_USER:
			// console.log("LOADING USER");
			// console.log(action);
			return Object.assign({}, state, {
				user: action.payload
			});
		case LOGOUT:
			return Object.assign({}, state, {
				loggedIn: false,
				account: null,
				msalIdToken: "",
				accessToken: ""
			})
		case LOAD_PATH_FROM_STORAGE: 
			try {
				let path = localStorage.getItem("path");
				let objectId = localStorage.getItem("objectId");
				if(path !== undefined && path !== null) {
					if(objectId !== undefined && objectId !== null) {
						return Object.assign({}, state, {
							pathObjectId: objectId,
							path: path
						});
					} else {
						return Object.assign({}, state, {
							path: path
						});
					}
				} else {
					return state;
				}
			} catch (err) {
				return state;
			}
		case SET_NEW_ACCESS_TOKEN:
			return Object.assign({}, state, {
				accessToken: action.payload
			});
		case SET_NEW_MSAL_TOKEN:
			return Object.assign({}, state, {
				msalIdToken: action.payload
			});
		case CHANGE_PATH:
			localStorage.setItem("path", action.payload);
			localStorage.removeItem("objectId");
			return Object.assign({}, state, {
				path: action.payload,
				pathObjectId: ""
			});
		case UPDATE_PATH_OBJECT_ID: 
			localStorage.setItem("path", action.payload.path);
			localStorage.setItem("objectId", action.payload.objectId);
			return Object.assign({}, state, {
				pathObjectId: action.payload.objectId,
				path: action.payload.path
			});
		case UPDATE_OBJECT_ID:
			return Object.assign({}, state, {
				pathObjectId: action.payload.objectId
			});
		case GO_BACK: {
			// grab last entry in history, set it as the new path, and then delete the last entry in the history array
			return 
		}
		default:
			return state;
	}
}

export default application;