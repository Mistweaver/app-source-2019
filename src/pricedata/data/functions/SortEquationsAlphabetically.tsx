import { Equation } from "../../equations/objects/Equation";

export function SortEquationsAlphabetically(equationA: Equation, equationB: Equation) {
	if(equationA.name.toLowerCase() > equationB.name.toLowerCase()) {
		return 1;
	} else if (equationA.name.toLowerCase() < equationB.name.toLowerCase()) {
		return -1;
	} else {
		return 0;
	}
}