import axiosInterceptor from "../../../utilities/AxiosInterceptor";
import { PATH } from "../../../ApplicationConfiguration";
import { WhitelistObject } from "./WhitelistObject";

export function getWhiteListEntries(page: number) {
	return axiosInterceptor.get(PATH + '/whitelist', {
		params: {
			page: page,
			sort: "creationTime,desc"
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


export function getWhiteListEntriesByLocationId(locationId: string) {
	return axiosInterceptor.get(PATH + '/whitelist/search/findByLocationId', {
		params: {
			locationId: locationId,
			sort: "creationTime,desc"
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

export function addNewEntry(entry: WhitelistObject) {
    return axiosInterceptor.post(`${PATH}/whitelist`, entry).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function updateEntry(entry: WhitelistObject) {
    return axiosInterceptor.put(`${PATH}/whitelist/${entry.id}`, entry).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}

export function deleteEntry(entryId: string) {
    return axiosInterceptor.delete(`${PATH}/whitelist/${entryId}`).then(response => {
        console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
    });
}