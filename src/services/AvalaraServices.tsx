import { PATH } from '../ApplicationConfiguration';
import { AvalaraTaxRequest } from '../objects/avalaraobjects/AvalaraTaxRequest';
import axiosInterceptor from '../utilities/AxiosInterceptor';
// import { getMsalIDToken } from '../services/HelperServices';

export function retrieveAvalaraAuthorizationCode() {
	return axiosInterceptor.get(`${PATH}/getavalaraauthorization`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function getCompanyLocations() {
	// app api call

	return axiosInterceptor.get(`${PATH}/avalara/getcompanylocations`).then(response => {
		console.log(response);
		return Promise.resolve(response);
	})
	.catch((error) => {
		console.log(error);
		return Promise.resolve(error.response);
	});
}

export function getCompanyItems() {
	return axiosInterceptor.get(`${PATH}/avalara/getcompanylocations`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function sendTransaction(documentId: string, type: string, transaction: AvalaraTaxRequest) {
	return axiosInterceptor.post(`${PATH}/avalara/transaction?docType=${type}&docId=${documentId}`, transaction).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

/*export function validateAddress(line1: string, city: string, region: string, country: string, postalCode: string) {
	return axiosInterceptor.post(`${PATH}/avalara/validateaddress`, {
		line1: line1,
		city: city,
		region: region,
		country: country,
		postalCode: postalCode
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}*/

export function getAvalaraRequestHistory(documentId: string) {
	return axiosInterceptor.get(`${PATH}/avalararesponses/search/findByDocumentId`, {
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