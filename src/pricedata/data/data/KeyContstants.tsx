/**
 * Key Constants in the API.  If a variable or equation contains this key, the variable name is immutable
 */

export const BASE_PRICE_KEY = "[basePrice]";
export const SQFT_KEY = "[SQFT]";
export const FACTORY_TOTAL_COST_KEY = "[factoryTotalCost]";
export const FACTORY_DIRECT_PRICE_KEY = "[factoryDirectPrice]";
export const FIRST_HALF_DISCOUNT_KEY = "[firstHalfDiscountPrice]";
export const SECOND_HALF_DISCOUNT_KEY = "[secondHalfDiscountPrice]";
export const MSRP_KEY = "[MSRP]";

export const KEY_CONSTANTS = [
	BASE_PRICE_KEY,
	SQFT_KEY,
	FACTORY_TOTAL_COST_KEY,
	FACTORY_DIRECT_PRICE_KEY,
	FIRST_HALF_DISCOUNT_KEY,
	SECOND_HALF_DISCOUNT_KEY,
	MSRP_KEY,
]

export function KEY_MATCHER(_key: string) {
	let isKeyConstant = false;
	KEY_CONSTANTS.forEach(constant => {
		if(constant === _key) {
			isKeyConstant = true;
		}
	});
	return isKeyConstant;
}

export function IS_VARIABLE_BASE_PRICE(_key: string) {
	return _key === BASE_PRICE_KEY;
}