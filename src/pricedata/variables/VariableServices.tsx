import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";
import { Variable } from "./objects/Variable";

export function getAllVariables() {
	return axiosInterceptor.get(`${PATH}/variables/all`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function getVariablePackage(variableId: string) {
	return axiosInterceptor.get(`${PATH}/variables/${variableId}/data`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function deleteVariable(variableId: string) {
	return axiosInterceptor.post(`${PATH}/variables/${variableId}/delete`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateVariable(variable: Variable) {
	return axiosInterceptor.post(`${PATH}/variables/${variable.id}/update`, variable).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function createNewVariable(variable: Variable) {
	return axiosInterceptor.post(`${PATH}/variables/create`, variable).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}