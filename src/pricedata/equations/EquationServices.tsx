import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";
import { Equation } from "./objects/Equation";

export function getAllEquations() {
	return axiosInterceptor.get(`${PATH}/equations/all`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

/*export function getEquations() {
	return axiosInterceptor.get(`${PATH}/equations/all`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}*/

export function getEquationPackage(equationId: string) {
	return axiosInterceptor.get(`${PATH}/equations/${equationId}/data`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}


export function deleteEquation(equationId: string) {
	return axiosInterceptor.post(`${PATH}/equations/${equationId}/delete`).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateEquation(equation: Equation) {
	return axiosInterceptor.post(`${PATH}/equations/${equation.id}/update`, equation).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function createNewEquation(equation: Equation) {
	return axiosInterceptor.post(`${PATH}/equations/create`, equation).then(response => {
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}