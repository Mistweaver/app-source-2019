import { PATH } from "../../../ApplicationConfiguration";
import axiosInterceptor from "../../../utilities/AxiosInterceptor";

export function generateRetrieveSummaryDocument(docType: string, docId: string) {
	return axiosInterceptor.get(PATH + '/taxes/summary/', {
		params: {
			documentType: docType,
            documentId: docId
		},
		responseType: 'arraybuffer'
    }).then(response => {
        //console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}