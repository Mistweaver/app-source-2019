import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";
import { CustomTaxes } from "../redux/containers/taxes/CustomTaxes";

export function getCustomTaxes(page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/customtaxes`, {
		params: {
			page: page,
			sort: sort,
			size: size,
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


export function getCustomTaxesByDocumentId(documentId: string) {
	return axiosInterceptor.get(`${PATH}/customtaxes/search/findByDocumentId`, {
		params: {
			documentId: documentId
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

export function getCustomTaxesByDocumentType(documentType: string) {
	return axiosInterceptor.get(`${PATH}/customtaxes/search/findByDocumentType`, {
		params: {
			documentType: documentType
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

export function createNewCustomTaxes(customTaxes: CustomTaxes) {
    console.log(customTaxes);
    return axiosInterceptor.post(`${PATH}/customtaxes/`, customTaxes).then(response => {
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateCustomTaxes(customTaxes: CustomTaxes) {
	// purchaseAgreement.status = "working";
	return axiosInterceptor.put(`${PATH}/customtaxes/${customTaxes.id}`, customTaxes).then(response => {
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getCustomTaxesByDocumentIdAndDocumentType(docType: string, docId: string) {
	return axiosInterceptor.get(`${PATH}/taxes/fordocument`, {
		params: {
			documentType: docType,
            documentId: docId
		}
	}).then(response => {
        //console.log("taxesDTO:")
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}


export function getTaxSummaryByDocumentIdAndDocumentType(docType: string, docId: string) {
	return axiosInterceptor.get(`${PATH}/taxes/summary`, {
		params: {
			documentType: docType,
            documentId: docId
		}
	}).then(response => {
        console.log("tax summary:")
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}


