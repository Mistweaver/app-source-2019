import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";
import { Manufacturer } from "../../objects/manufacturer/Manufacturer";

export function getManufacturers() {
	return axiosInterceptor.get(`${PATH}/manufacturers/all`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function getManufacturerByKey(key: string) {
	return axiosInterceptor.get(`${PATH}/manufacturers/search/findByKey`, {
		params: {
			key: key
		}
	}).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function addManufacturer(manufacturer: Manufacturer) {
    return axiosInterceptor.post(`${PATH}/manufacturers`, manufacturer).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateManufacturer(manufacturer: Manufacturer) {
    return axiosInterceptor.put(`${PATH}/manufacturers/${manufacturer.id}`, manufacturer).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function deleteManufacturer(manufacturerId: string) {
    return axiosInterceptor.delete(`${PATH}/manufacturers/${manufacturerId}`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}