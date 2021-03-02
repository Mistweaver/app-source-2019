import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";
import { User } from "../objects/user/User";


export function getRoles() {
	return axiosInterceptor.get(PATH + '/roles').then(response => {
        // console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function createUserProfile(user: User) {
	return axiosInterceptor.post(PATH + '/users', user).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function updateUserProfile(user: User) {
	return axiosInterceptor.put(PATH + '/users/' + user.id, user).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getUsers(page: number, size: number, sort: string) {
	return axiosInterceptor.get(PATH + '/users', {
		params: {
			page: page,
			sort: sort,
			size: size,
        }
    }).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getUserByEmail(email: string) {
	return axiosInterceptor.get(PATH + '/users/search/findByEmail', {
		params: {
			email: email
		}
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getUsersByLocation(selectedLocation: string) {
	return axiosInterceptor.get(`${PATH}/users/search/findByLocationId`, {
		params: {
			locationId: selectedLocation
		}
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getUsersByRole(selectedRole: string) {
	return axiosInterceptor.get(`${PATH}/users/search/findByRole`, {
		params: {
			role: selectedRole
		}
	}).then(response => {
        console.log(response);
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}