import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";

export function uploadSignedChangeOrder(data: FormData) {
	return axiosInterceptor.post(`${PATH}/uploadSignedChangeOrder`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
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

export function uploadSignedAgreement(data: FormData) {
	return axiosInterceptor.post(`${PATH}/uploadSignedAgreement`, data, {
		headers: {
			'Content-Type': 'multipart/form-data'
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