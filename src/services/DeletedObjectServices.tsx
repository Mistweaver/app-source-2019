import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";

export function getDeletedObjects(page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/deletedobjects`, {
		params: {
			page: page,
			size: size,
			sort: sort
		}
	}).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function restoreDeleteObject(id: string) {
    return axiosInterceptor.post(`${PATH}/deletedobjects/restore`, {
		deletedObjectId: id
	}).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

