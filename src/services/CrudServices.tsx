import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";

export function getObjects(resourcePath: string) {
	return axiosInterceptor.get(`${PATH}/${resourcePath}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function getObjectsByPage(resourcePath: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/${resourcePath}`, {
        params: {
			page: page,
			size: size,
			sort: sort
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

export function addObject(object: any, resourcePath: string) {
    return axiosInterceptor.post(`${PATH}/${resourcePath}`, object).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateObject(object: any, resourcePath: string) {
    return axiosInterceptor.put(`${PATH}/${resourcePath}/${object.id}`, object).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function deleteObject(object: any, resourcePath: string) {
    return axiosInterceptor.delete(`${PATH}/${resourcePath}/${object.id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}