import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";


export function getSalesOffices(page: number) {
	return axiosInterceptor.get(PATH + '/salesoffices', {
		params: {
			page: page
		}
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getAllSalesOffices() {
	return axiosInterceptor.get(PATH + '/getalloffices').then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getSalesOfficeByLocationId(locationId: string) {
	return axiosInterceptor.get(PATH + '/salesoffices/' + locationId).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}