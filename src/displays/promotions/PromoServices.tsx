import { Promotion } from "./Promotion";
import axiosInterceptor from "../../utilities/AxiosInterceptor";
import { PATH } from "../../ApplicationConfiguration";

export function getPromotionsByYear(year: number) {
	return axiosInterceptor.get(`${PATH}/promos/search/findByYear`, {
		params: {
			year: year
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPromotionsForToday() {
	let todaysDate = new Date();
	return axiosInterceptor.get(`${PATH}/promos/search/findByDate`, {
		params: {
			date: todaysDate.getMonth().toString() + "/" + todaysDate.getFullYear().toString()
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

export function addNewPromoMonth(promotion: Promotion) {
	return axiosInterceptor.post(`${PATH}/promos/`, promotion).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function updatePromoMonth(promotion: Promotion) {
	return axiosInterceptor.put(`${PATH}/promos/${promotion.id}`, promotion).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPromoModelListByPriceSheetId(id: string) {
	return axiosInterceptor.get(`${PATH}/promomodellist/search/findByPriceSheetId`, {
		params: {
			priceSheetId: id
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}
