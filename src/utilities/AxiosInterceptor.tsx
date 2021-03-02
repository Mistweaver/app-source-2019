import axios from 'axios';
import { checkIdTokenExpiration } from '../auth/AuthServices';
import store from '../redux/Store';
import { LOGIN_EXPIRED } from '../redux/types/ApplicationTypes';

var axiosInterceptor = axios.create({
	withCredentials: true
});

// might be redundant idk
axiosInterceptor.defaults.withCredentials = true;

// request interceptor
axiosInterceptor.interceptors.request.use(function (config) {
	var accessToken = store.getState().application?.msalIdToken;
	if(accessToken !== "") {
		if(checkIdTokenExpiration(accessToken || "")) {
			store.dispatch({ type: LOGIN_EXPIRED });
			config.headers = {};
			config.url = "";
			throw new axios.Cancel('Expired token: action aborted');
		} else {
			if(accessToken) {
				if(config.method !== 'OPTIONS') {
					config.headers = {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + accessToken,	
					}
				}
			}
		}
	}
	
	
	return config;
}, function (error) {
	return Promise.reject(error);
});


export default axiosInterceptor;

