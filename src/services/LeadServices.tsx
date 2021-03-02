import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";


export function getLeads(page: number, size: number, sort: string) {
	return axiosInterceptor.get(PATH + '/leads', {
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

export function getLeadById(id: string) {
	return axiosInterceptor.get(`${PATH}/leads/${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getLeadContractsByLeadId(id: string) {
	return axiosInterceptor.get(`${PATH}/leads/contracts/leadId`, {
		params: {
			leadId: id
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

export function getLeadContractsByCCId(id: string) {
	return axiosInterceptor.get(`${PATH}/leads/contracts/ccId`, {
		params: {
			ccId: id
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



export function getLeadsById(id: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLeadId`, {
		params: {
			leadId: id
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

export function getLeadsByLocationId(locationId: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLocationId`, {
		params: {
			locationId: locationId,
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

export function getLeadsByUserId(userId: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByUserId`, {
		params: {
			userId: userId,
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

export function getMyLeadsByFirstName(userId: string, firstName: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByUserIdAndFirstNameLike`, {
		params: {
			userId: userId,
			firstName: firstName,
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

export function getMyLeadsByLastName(userId: string, lastName: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByUserIdAndLastNameLike`, {
		params: {
			userId: userId,
			lastName: lastName,
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

export function getLeadsByFirstName(firstName: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByFirstNameLike`, {
		params: {
			firstName: firstName
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

export function getLeadsByLastName(lastName: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLastNameLike`, {
		params: {
			lastName: lastName
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

export function deleteLead(id: string) {
	return axiosInterceptor.delete(`${PATH}/leads/delete?leadId=${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function masterDeleteLead(id: string) {
	return axiosInterceptor.delete(`${PATH}/leads/masterdelete?leadId=${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getMasterObjects(locationId: string, userId: string, size: number, page: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/leads/master`, {
		params: {
			locationId: locationId,
			userId: userId,
			size: size,
			page: page,
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


export function getLocationLeadsByCCId(leadId: string, locationId: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLocationIdAndLeadId`, {
		params: {
			leadId: leadId,
			locationId: locationId
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

export function getLocationLeadsByFirstName(firstName: string, locationId: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLocationIdAndFirstNameLike`, {
		params: {
			locationId: locationId,
			firstName: firstName
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

export function getLocationLeadsByLastName(lastName: string, locationId: string) {
	return axiosInterceptor.get(`${PATH}/leads/search/findByLocationIdAndLastNameLike`, {
		params: {
			locationId: locationId,
			lastName: lastName
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
