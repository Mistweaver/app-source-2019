/***
 * Format the name of variables/equations to be used in key-form
 * 
 * - only a-zA-Z allowed
 * - no numbers or special characters
 * - key strings must start with [ and end with ]
 * - API will also double check this format
 */

import { camelize } from "../../dev/Camelize";

export function FormatNameAsKey(name: string) {
	let _key = name;

	// allowed characters regex string
	// var regex = /[^a-zA-Z0-9]/g;

	// Camelize the string. Whitespace is removed by the camelize() function.
	_key = camelize(_key);

	// add brackets at start and end
	 _key = "[" + _key + "]";
	 
	return _key;
}