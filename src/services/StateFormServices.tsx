import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";
import { StateForm } from "../objects/stateform/StateForm";


export function getStateFormsByState(state: string) {
	return axiosInterceptor.get(PATH + '/stateforms/search/findByState', {
		params: {
			state: state
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

export function getStateFormsByStateAndModelType(state: string, modelType: string) {
	return axiosInterceptor.get(PATH + '/stateforms/search/findByStateAndModelType', {
		params: {
            state: state,
            modelType: modelType
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

export function addNewForm(form: StateForm) {
	return axiosInterceptor.post(PATH + '/stateforms', form).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function updateForm(form: StateForm) {
	return axiosInterceptor.put(PATH + '/stateforms/' + form.id, form).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function deleteForm(formId: string) {
	return axiosInterceptor.delete(PATH + '/stateforms/' + formId).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}