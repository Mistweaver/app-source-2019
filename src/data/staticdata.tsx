export const PREFERRED_PAYMENT_DISCOUNT_AMOUNT = .03;
export const VIP_MULTI_UNIT_DISCOUNT_AMOUNT = .03;

// constant blank value
export const NONE = "";

// Agreement States (must match the API)

// export const NEW_DOCUMENT = "new";
// export const WORKING = "working";
// export const SUBMITTED_deprecated = "submitted";
// export const EXECUTED_deprecated = "executed";
// export const LOCKED = "closed";
// export const VOID = "revised";
// export const REVISED_FROM_CHANGE_ORDER = "revised with change order";

export function returnReadableState(state: string) {
	let regex = /_/gi;
	switch(state) {
		case IN_PROGRESS:
			return "in-progress"
		default:
			return state.replaceAll(regex, ' ').toLowerCase();
	}
}

// new states (8/4/2020 update)
export const IN_PROGRESS = "IN_PROGRESS";
export const SUBMITTED = "SUBMITTED";
export const EXECUTED = "EXECUTED";
export const CLOSED = "CLOSED";
// export const REVISED = "REVISED";

// lead states
export const NEW = "NEW";
export const PURCHASE_AGREEMENT_IN_PROGRESS = "PURCHASE_AGREEMENT_IN_PROGRESS";
export const PURCHASE_AGREEMENT_SUBMITTED = "PURCHASE_AGREEMENT_SUBMITTED";
export const PURCHASE_AGREEMENT_EXECUTED = "PURCHASE_AGREEMENT_EXECUTED";
export const PURCHASE_AGREEMENT_CLOSED = "PURCHASE_AGREEMENT_CLOSED";
export const CHANGE_ORDER_IN_PROGRESS = "CHANGE_ORDER_IN_PROGRESS";
export const CHANGE_ORDER_SUBMITTED = "CHANGE_ORDER_SUBMITTED";
export const CHANGE_ORDER_EXECUTED = "CHANGE_ORDER_EXECUTED";
export const CHANGE_ORDER_CLOSED = "CHANGE_ORDER_CLOSED";
export const REVISED_AGREEMENT_IN_PROGRESS = "REVISED_AGREEMENT_IN_PROGRESS";

export function returnReadableLeadState(state: string) {
	let regex = /_/gi;
	switch(state) {
		case NEW:
			return "new";
		case PURCHASE_AGREEMENT_IN_PROGRESS:
			return "agreement in-progress";
		case PURCHASE_AGREEMENT_SUBMITTED:
			return "agreement submitted";
		case PURCHASE_AGREEMENT_EXECUTED:
			return "agreement executed";
		case PURCHASE_AGREEMENT_CLOSED:
			return "agreement closed";
		case CHANGE_ORDER_IN_PROGRESS:
			return "change order in-progress";
		case CHANGE_ORDER_SUBMITTED:
			return "change order submitted";
		case CHANGE_ORDER_EXECUTED:
			return "change order executed";
		case CHANGE_ORDER_CLOSED:
			return "change order closed";
		case REVISED_AGREEMENT_IN_PROGRESS:
			return "revision in-progress";
		default:
			return state.replaceAll(regex, ' ').toLowerCase();
	}
}


// Price Data States

export const ACTIVE = "active";
export const PENDING = "pending";
export const DRAFT = "draft";
export const EXPIRED = "expired";



export const STATES = [
	{ id: 1, name: "Alabama", abbreviation: "AL"},
	{ id: 2, name: "Alaska", abbreviation: "AK"},
	{ id: 3, name: "Arizona", abbreviation: "AZ"},
	{ id: 4, name: "Arkansas", abbreviation: "AR"},
	{ id: 5, name: "California", abbreviation: "CA"},
	{ id: 6, name: "Colorado", abbreviation: "CO"},
	{ id: 7, name: "Connecticut", abbreviation: "CT"},
	{ id: 8, name: "Delaware", abbreviation: "DE"},
	{ id: 9, name: "Florida", abbreviation: "FL"},
	{ id: 10, name: "Georgia", abbreviation: "GA"},
	{ id: 11, name: "Hawaii", abbreviation: "HI"},
	{ id: 12, name: "Idaho", abbreviation: "ID"},
	{ id: 13, name: "Illinois", abbreviation: "IL"},
	{ id: 14, name: "Indiana", abbreviation: "IN"},
	{ id: 15, name: "Iowa", abbreviation: "IA"},
	{ id: 16, name: "Kansas", abbreviation: "KS"},
	{ id: 17, name: "Kentucky", abbreviation: "KY"},
	{ id: 18, name: "Louisiana", abbreviation: "LA"},
	{ id: 19, name: "Maine", abbreviation: "ME"},
	{ id: 20, name: "Maryland", abbreviation: "MD"},
	{ id: 21, name: "Massachusetts", abbreviation: "MA"},
	{ id: 22, name: "Michigan", abbreviation: "MI"},
	{ id: 23, name: "Minnesota", abbreviation: "MN"},
	{ id: 24, name: "Mississippi", abbreviation: "MS"},
	{ id: 25, name: "Missouri", abbreviation: "MO"},
	{ id: 26, name: "Montana", abbreviation: "MT"},
	{ id: 27, name: "Nebraska", abbreviation: "NE"},
	{ id: 28, name: "Nevada", abbreviation: "NV"},
	{ id: 29, name: "New Hampshire", abbreviation: "NH"},
	{ id: 30, name: "New Jersey", abbreviation: "NJ"},
	{ id: 31, name: "New Mexico", abbreviation: "NM"},
	{ id: 32, name: "New York", abbreviation: "NY"},
	{ id: 33, name: "North Carolina", abbreviation: "NC"},
	{ id: 34, name: "North Dakota", abbreviation: "ND"},
	{ id: 35, name: "Ohio", abbreviation: "OH"},
	{ id: 36, name: "Oklahoma", abbreviation: "OK"},
	{ id: 37, name: "Oregon", abbreviation: "OR"},
	{ id: 38, name: "Pennsylvania", abbreviation: "PA"},
	{ id: 39, name: "Rhode Island", abbreviation: "RI"},
	{ id: 40, name: "South Carolina", abbreviation: "SC"},
	{ id: 41, name: "South Dakota", abbreviation: "SD"},
	{ id: 42, name: "Tennessee", abbreviation: "TN"},
	{ id: 43, name: "Texas", abbreviation: "TX"},
	{ id: 44, name: "Utah", abbreviation: "UT"},
	{ id: 45, name: "Vermont", abbreviation: "VT"},
	{ id: 46, name: "Virginia", abbreviation: "VA"},
	{ id: 47, name: "Washington", abbreviation: "WA"},
	{ id: 48, name: "West Virginia", abbreviation: "WV"},
	{ id: 49, name: "Wisconsin", abbreviation: "WI"},
	{ id: 50, name: "Wyoming", abbreviation: "WY"},
]