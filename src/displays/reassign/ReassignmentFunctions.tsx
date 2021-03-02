import axiosInterceptor from "../../utilities/AxiosInterceptor";

import { PATH } from "../../ApplicationConfiguration";

export function reassignAgreement(agreementId: string, newKey: string) {
	return axiosInterceptor.post(`${PATH}/purchaseagreements/reassignagreement`, { 
		agreementId: agreementId,
		reassignedUserKey: newKey
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function reassignLead(leadId: string, newKey: string) {
	return axiosInterceptor.post(`${PATH}/leads/reassignlead`, { 
		leadId: leadId,
		reassignedUserKey: newKey
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}