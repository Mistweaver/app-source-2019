import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";


/************* While the endpoint and params say Agreement ID, this works for both agreements AND change orders */
export function getFilesByDocumentId(docId: string) {
	return axiosInterceptor.get(`${PATH}/storedfiles/search/getFilesByAgreementId`, {
		params: {
			agreementId: docId
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

export function retrieveFile(path: string) {
	return axiosInterceptor.get(PATH + '/downloadFile/' + path, {
		responseType: 'arraybuffer'
    }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}