import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";
import { ChangeOrder } from "../objects/changeorders/ChangeOrder";

export function getChangeOrdersByAgreementId(changeOrderId: string) {
	return axiosInterceptor.get(PATH + '/changeorders/search/findByPurchaseAgreementId', {
		params: {
			purchaseAgreementId: changeOrderId
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

export function getChangeOrderById(id: string) {
	return axiosInterceptor.get(`${PATH}/changeorders/${id}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getChangeOrdersByStatus(status: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/changeorders/search/findByStatus`, {
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

export function updateChangeOrder(changeOrder: ChangeOrder) {
	return axiosInterceptor.put(`${PATH}/changeorders/${changeOrder.id}`, changeOrder).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function submitChangeOrder(changeOrderId: string) {
	return axiosInterceptor.post(`${PATH}/changeorders/submit`, { changeOrderId: changeOrderId }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function unsubmitChangeOrder(changeOrderId: string) {
	return axiosInterceptor.post(`${PATH}/changeorders/unsubmit`, { changeOrderId: changeOrderId }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function deleteChangeOrder(changeOrderId: string) {
	return axiosInterceptor.delete(`${PATH}/changeorders/delete?changeOrderId=${changeOrderId}`,).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}
