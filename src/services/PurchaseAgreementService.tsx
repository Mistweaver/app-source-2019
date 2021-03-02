import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";
import { PurchaseAgreement } from "../objects/purchaseagreement/PurchaseAgreement";
import { Lead } from "../objects/lead/Lead";

export function getPurchaseAgreements(page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements`, {
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

export function getPurchaseAgreementById(id: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPurchaseAgreementData(id: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/getagreementdata`, {
		params: {
			agreementId: id
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

export function getPurchaseAgreementsByLeadId(leadId: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByLeadId`, {
		params: {
			leadId: leadId
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

export function getPurchaseAgreementsByLocationId(id: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByLocationId`, {
		params: {
			locationId: id,
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

export function getPurchaseAgreementsByStatus(status: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByStatus`, {
		params: {
			status: status,
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

export function getPurchaseAgreementsByCrmLeadId(crmLeadId: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByCrmLeadId`, {
		params: {
			crmLeadId: crmLeadId
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

export function getPurchaseAgreementsBySalesPersonId(id: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonId`, {
		params: {
			salesPersonId: id,
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

/*export function getPurchaseAgreementById(id: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}*/


export function submitAgreement(agreementId: string) {
	return axiosInterceptor.post(`${PATH}/purchaseagreements/submit`, { agreementId: agreementId }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function unsubmitAgreement(agreementId: string) {
	return axiosInterceptor.post(`${PATH}/purchaseagreements/unsubmit`, { agreementId: agreementId }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function reassignAgreement(id: string, userKey: string) {
	return axiosInterceptor.post(`${PATH}/purchaseagreements/reassign`, { agreementId: id, reassignedUserKey: userKey }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function revisePurchaseAgreement(agreement: PurchaseAgreement) {

	agreement.contractRevisedFrom = agreement.id;
	console.log(agreement.id);

	agreement.contractRevisedFromDate = agreement.date;
	agreement.id = "";
	agreement.createdBy = "";
	agreement.creationTime = "";
	agreement.modificationTime = "";
	agreement.modifiedBy = "";
	agreement.date = (new Date()).toLocaleDateString();
	return axiosInterceptor.post(`${PATH}/purchaseagreements/revise?agreementId=${agreement.contractRevisedFrom}`, agreement).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
	

}

/*export function createNewPurchaseAgreement(leadId: string, salesOfficeId: string) {
	// create new purchase agreement for lead
	return axiosInterceptor.post(`${PATH}/purchaseagreements/new?leadId=${leadId}&locationId=${salesOfficeId}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}*/

export function createNewPurchaseAgreement(lead: Lead, salesOfficeId: string) {
    // create new purchase agreement for lead
    let newPurchaseAgreement = new PurchaseAgreement();
    newPurchaseAgreement.locationId = salesOfficeId;
    // set agreement information from lead
    if(lead.id !== null) {
        newPurchaseAgreement.leadId = lead.id;
    }
    if(lead.userId !== null) {
        newPurchaseAgreement.salesPersonId = lead.userId;
    }
    if(lead.leadId !== null) {
        newPurchaseAgreement.crmLeadId = lead.leadId;
    }
    if(lead.firstName !== null || lead.lastName !== null) {
        newPurchaseAgreement.buyer1 = lead.firstName + " " + lead.lastName;
    }
    if(lead.emailAddress !== null) {
        newPurchaseAgreement.emailAddress = lead.emailAddress;
    }
    if(lead.phone !== null) {
        newPurchaseAgreement.phone = lead.phone;
    }
    if(lead.deliveryCity !== null) {
        newPurchaseAgreement.deliveryCity = lead.deliveryCity;
    }
    if(lead.deliveryState !== null) {
        newPurchaseAgreement.deliveryState = lead.deliveryState;
    }
    if(lead.deliveryStreet !== null) {
        newPurchaseAgreement.deliveryStreet = lead.deliveryStreet;
    }
    if(lead.deliveryCountry !== null) {
        newPurchaseAgreement.deliveryCountry = lead.deliveryCountry;
    }
    if(lead.deliveryZip !== null) {
        newPurchaseAgreement.deliveryZip = lead.deliveryZip;
    }
    return axiosInterceptor.post(`${PATH}/purchaseagreements/new?leadId=${lead.id}`, newPurchaseAgreement).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function adminOverrideNewPurchaseAgreement(lead: Lead, salesOfficeId: string) {
    // create new purchase agreement for lead
    let newPurchaseAgreement = new PurchaseAgreement();
    newPurchaseAgreement.locationId = salesOfficeId;
    // set agreement information from lead
    if(lead.id !== null) {
        newPurchaseAgreement.leadId = lead.id;
    }
    if(lead.userId !== null) {
        newPurchaseAgreement.salesPersonId = lead.userId;
    }
    if(lead.leadId !== null) {
        newPurchaseAgreement.crmLeadId = lead.leadId;
    }
    if(lead.firstName !== null || lead.lastName !== null) {
        newPurchaseAgreement.buyer1 = lead.firstName + " " + lead.lastName;
    }
    if(lead.emailAddress !== null) {
        newPurchaseAgreement.emailAddress = lead.emailAddress;
    }
    if(lead.phone !== null) {
        newPurchaseAgreement.phone = lead.phone;
    }
    if(lead.deliveryCity !== null) {
        newPurchaseAgreement.deliveryCity = lead.deliveryCity;
    }
    if(lead.deliveryState !== null) {
        newPurchaseAgreement.deliveryState = lead.deliveryState;
    }
    if(lead.deliveryStreet !== null) {
        newPurchaseAgreement.deliveryStreet = lead.deliveryStreet;
    }
    if(lead.deliveryCountry !== null) {
        newPurchaseAgreement.deliveryCountry = lead.deliveryCountry;
    }
    if(lead.deliveryZip !== null) {
        newPurchaseAgreement.deliveryZip = lead.deliveryZip;
    }
    return axiosInterceptor.post(`${PATH}/purchaseagreements/override`, newPurchaseAgreement).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

/*export function updatePurchaseAgreement(purchaseAgreement: PurchaseAgreement) {
	// purchaseAgreement.status = "working";
	return axiosInterceptor.put(`${PATH}/purchaseagreements/${purchaseAgreement.id}`, purchaseAgreement).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}*/

export function editPurchaseAgreement(purchaseAgreement: PurchaseAgreement) {
	return axiosInterceptor.put(`${PATH}/purchaseagreements/editagreement`, purchaseAgreement).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error.response);
        return Promise.resolve(error.response);
	});
}

export function createChangeOrder(id: string) {
	return axiosInterceptor.post(`${PATH}/purchaseagreements/createchangeorder?agreementId=${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function deleteAgreement(id: string) {
	return axiosInterceptor.delete(`${PATH}/purchaseagreements/delete`, {
		params: {
			agreementId: id
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

export function masterDeleteAgreement(id: string) {
	return axiosInterceptor.delete(`${PATH}/purchaseagreements/masterdelete`, {
		params: {
			agreementId: id
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

/*********** General Search Functions ************** */

export function getAgreementsByLeadId(leadId: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByLeadId`, {
		params: {
			leadId: leadId
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

export function getAgreementsByBuyerName(buyerName: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByBuyer1Like`, {
		params: {
			buyer1: buyerName
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

export function getAgreementsByDeliveryState(state: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByDeliveryState`, {
		params: {
			deliveryState: state
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

export function getAgreementsByEmail(email: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findByEmailAddress`, {
		params: {
			email: email
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

/********************* My Agreement Search Functions ***** */

export function getMyAgreementById(myId: string, agreementId: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonIdAndId`, {
		params: {
			salesPersonId: myId,
			id: agreementId
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

export function getMyAgreementsByBuyerName(myId: string, buyerName: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonIdAndBuyer1Like`, {
		params: {
			salesPersonId: myId,
			buyer1: buyerName
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

export function getMyAgreementsByLeadId(myId: string, leadId: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonIdAndLeadId`, {
		params: {
			salesPersonId: myId,
			leadId: leadId
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

export function getMyAgreementsByDeliveryState(myId: string, state: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonIdAndDeliveryState`, {
		params: {
			salesPersonId: myId,
			deliveryState: state
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

export function getMyAgreementsByEmail(myId: string, email: string) {
	return axiosInterceptor.get(`${PATH}/purchaseagreements/search/findBySalesPersonIdAndEmailAddress`, {
		params: {
			salesPersonId: myId,
			email: email
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