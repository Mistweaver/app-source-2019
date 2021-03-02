import { Variable } from "../../variables/objects/Variable";

export function SortVariablesAlphabetically(variableA: Variable, variableB: Variable) {
	if(variableA.name.toLowerCase() > variableB.name.toLowerCase()) {
		return 1;
	} else if (variableA.name.toLowerCase() < variableB.name.toLowerCase()) {
		return -1;
	} else {
		return 0;
	}
}