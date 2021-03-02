import { ApplicationDataActionTypes, LOAD_SALES_OFFICES } from "../types/ApplicationDataTypes";

function agreementdata(
	state = {
		salesOffices: [],
	},
	action: ApplicationDataActionTypes
) {
	switch(action.type) {
		case LOAD_SALES_OFFICES:
			return Object.assign({}, state, {
				salesOffices: action.payload
			});
		default:
			return state;
	}
}

export default agreementdata;