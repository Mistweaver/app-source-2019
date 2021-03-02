/* eslint-disable no-loop-func */
import { returnReadableState } from "../../data/staticdata";
import { BasicEntity } from "../../objects/entity/BasicEntity";
import { Model } from "../../objects/models/Model";
import { FormatNumberAsMoney } from "../../utilities/FormatNumberAsMoney";
import { Equation } from "../equations/objects/Equation";
import { EquationData } from "../equations/objects/EquationData";
import { VariableData } from "../variables/objects/VariableData";

export class PriceData extends BasicEntity {
	modelId: string;
	model: Model;

	locationId: string;

	status: string;

	activeDate: string;
	expirationDate: string;

	dataUpdated: boolean;
	error: boolean;
	errorDetails: string;

	variables: VariableData[];
	equations: EquationData[];

	name: string;
	seriesName: string;

	basePrice: number;
	factoryTotalCost: number;
	subTotal: number;
	msrp: number;
	factoryDirectPrice: number;
	firstHalfAdvertisingPrice: number;
	secondHalfAdvertisingPrice: number;

	constructor() {
		super();
		this.id= "";
		this.modelId = "";
		this.model = new Model();

		this.locationId = "";

		this.status = "";

		this.activeDate = "";
		this.expirationDate = "";

		this.dataUpdated = false;
		this.error = false;
		this.errorDetails= "";

		this.variables = [];
		this.equations = [];

		this.name= "";
		this.seriesName= "";

		this.basePrice = 0;
		this.factoryTotalCost = 0;
		this.subTotal = 0;
		this.msrp = 0;
		this.factoryDirectPrice = 0;
		this.firstHalfAdvertisingPrice = 0;
		this.secondHalfAdvertisingPrice = 0;

	}

}


export function calculateSubTotal(data: PriceData) {
	let subtotalEquation: EquationData = getEquation("[SUBTOTAL]", data.equations);
	if(subtotalEquation.id !== "") {
		let subtotal = evaluateEquation(subtotalEquation.equation, data);
		return(<span>{FormatNumberAsMoney(subtotal)}</span>)
	} else {
		return(<span>[SUBTOTAL] key missing</span>)
	}
}

export function getEquation(key: string, equations: EquationData[]) {
	for(var i = 0; i < equations.length; i++) {
		if(equations[i].key === key) {
			return equations[i];
		}
	}
	return new EquationData();
}

export function getVariable(key: string, variables: VariableData[]) {	
	for(var i = 0; i < variables.length; i++) {
		if(variables[i].key === key) {
			return variables[i];
		}
	}
	return new VariableData();
}


export function evaluateEquation(equationString: string, data: PriceData) {
	/**
	 * Replace tokens with values.
	 */
	var detokenizedEquationString = detokenizeEquation(equationString, data);
	/**
	 * Evaluate the resolved equation, and return the result.
	 */
	try {
		// eslint-disable-next-line no-eval
		let value = eval(detokenizedEquationString);
		return value;
	} catch(err) {
		console.log(err);
		return null
	}
}


export function detokenizeEquation(equationString: string, data: PriceData) {
	var limit: number = 0;
	/**
	 * Replace tokens with values.
	 */
	var matches: any = equationString.match(/\[(.*?)\]/g);
	while(matches !== null && limit < 100) {
		matches = equationString.match(/\[(.*?)\]/g);

		if(matches !== null) {
			matches.forEach((match: string) => {

				var matchedEquation = getEquation(match, data.equations);
				var matchedVariable = getVariable(match, data.variables);

				if(matchedEquation.id !== "") {
					equationString = equationString.replace(match, matchedEquation.equation);
				} else if(matchedVariable.id !== "") {
					equationString = equationString.replace(match, matchedVariable.value.toString());
				} else if(match === "[basePrice]") {
					equationString = equationString.replace(match, data.basePrice.toString());
				} else if(match === "[SQFT]") {
					equationString = equationString.replace(match, data.model.estimatedSquareFeet.toString());
				}
			});
		}
		limit++;
	}

	if(limit === 100) {
		return "infinite loop occurred: " + equationString;
	}

	/**
	 * Return the detokenized equation.
	 */
	return equationString;
}






