export function FormatNumberAsMoney(value: number | null) {
	if(value !== null && value !== undefined && !isNaN(value)) {
		let _value = Number(value);
		return '$' + _value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
	}
	return "ERR: " + value;
}
