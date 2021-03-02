import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";


export function getFactories(page: number) {
	return axiosInterceptor.get(PATH + '/factories', {
		params: {
			page: page
		}
	}).then(response => {
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getAllFactories() {
	return axiosInterceptor.get(PATH + '/getallfactories').then(response => {
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}
