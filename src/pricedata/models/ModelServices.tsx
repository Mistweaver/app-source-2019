import { Model } from "../../objects/models/Model";
import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";
import { ModelDraftPackage } from "./objects/ModelDraftPackage";
import { NewModelPackage } from "../objects/NewModelPackage";
import { NewDataForModelPackage } from "./newdraftcomponents/NewDataForModelPackage";

export function getAllModels() {
	return axiosInterceptor.get(PATH + '/models/all').then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getModels(page: number, size: number, sort: string) {
	return axiosInterceptor.get(PATH + '/models', {
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

export function getManufacturerModels(id: string) {
	return axiosInterceptor.get(PATH + '/models/search/findByManufacturerId', {
		params: {
			manufacturerId: id
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

/*export function getModelByModelNumber(modelNumber: string) {
	return axiosInterceptor.get(PATH + '/models/search/findByModelNumber', {
		params: {
			modelNumber: modelNumber
		}
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}*/


export function findModelNumber(modelnumber: string) {
	return axiosInterceptor.get(PATH + '/models/search/findByModelNumberLike', {
		params: {
			modelNumber: modelnumber
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

export function addModel(model: NewModelPackage) {
	return axiosInterceptor.post(PATH + '/models/new', model).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function saveModelEdits(model: Model) {
	return axiosInterceptor.post(`${PATH}/models/${model.id}/edit`, model).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}


export function createDraftsForModel(draftPackage: ModelDraftPackage) {
	return axiosInterceptor.post(PATH + '/models/newdrafts', draftPackage).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getModelPriceData(modelId: string) {
	return axiosInterceptor.get(PATH + '/models/' + modelId + '/data').then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function deleteModel(modelId: string) {
	return axiosInterceptor.post(PATH + '/models/' + modelId + '/delete').then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function createNewDataForModel(newData: NewDataForModelPackage) {
	return axiosInterceptor.post(PATH + '/models/data/new', newData).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}