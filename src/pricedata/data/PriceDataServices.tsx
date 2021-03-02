import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";
import { UpdatePackage } from "../restpackages/UpdatePackage";
import { DraftPackage } from "./DraftPackage";
import { EquationDataUpdatePackage } from "../equations/objects/EquationDataUpdatePackage";
import { VariableDataUpdatePackage } from "../variables/objects/VariableDataUpdatePackage";
import { TemplateUpdatePackage } from "./TemplateUpdatePackage";
import { DataIdListPackage } from "../restpackages/DataIdListPackage";

export function getPriceDataForLocation(id: string) {
	return axiosInterceptor.get(PATH + '/pricedata/location', {
		params: {
			locationId: id
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

export function getDraftsForLocation(id: string) {
	console.log("ID: " + id);
	return axiosInterceptor.get(PATH + '/pricedata/location/drafts', {
		params: {
			locationId: id
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

export function getActiveDataForLocation(id: string) {
	console.log("ID: " + id);
	return axiosInterceptor.get(PATH + '/pricedata/location/active', {
		params: {
			locationId: id
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

export function getAllDrafts() {
	return axiosInterceptor.get(PATH + '/pricedata/search/findByStatus', {
		params: {
			status: "draft"
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

export function getExpiredData() {
	return axiosInterceptor.get(PATH + '/pricedata/search/findByStatus', {
		params: {
			status: "expired"
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

export function getCurrentPriceData(_locationId: string) {
	return axiosInterceptor.get(`${PATH}/pricedata/active/current`, {
		params: {
			locationId: _locationId,
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




export function getPriceDataById(id: string) {
	return axiosInterceptor.get(PATH + '/pricedata/' + id).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}


export function getPriceDataByModelAndLocation(_locationId: string, _modelId: string) {
	return axiosInterceptor.get(PATH + '/pricedata/modeldataforlocation', {
		params: {
			locationId: _locationId,
			modelId: _modelId
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

export function updatePriceDataInfo(updatePackage: UpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/update`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}



export function updateDataFromTemplate(templateUpdatePackage: TemplateUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/template/update`, templateUpdatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function createDraftsFromData(draftPackage: DraftPackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/create`, draftPackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function recalculatePricing(dataIdList: DataIdListPackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/recalculate`, dataIdList).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function pushToPending(dataIdList: DataIdListPackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/push`, dataIdList).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

/********************* Variables ******************** */
export function addVariableToData(updatePackage: VariableDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/variable/add`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateVariableInData(updatePackage: VariableDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/variable/update`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function removeVariableFromData(updatePackage: VariableDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/variable/remove`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}



/********************* Equations ******************** */
export function addEquationToData(updatePackage: EquationDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/equation/add`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateEquationInData(updatePackage: EquationDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/equation/update`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function removeEquationFromData(updatePackage: EquationDataUpdatePackage) {
	return axiosInterceptor.post(`${PATH}/pricedata/drafts/equation/remove`, updatePackage).then(response => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}