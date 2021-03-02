import { PriceSheet } from "../objects/pricesheet/PriceSheet";
import axiosInterceptor from "../utilities/AxiosInterceptor";
import { PATH } from "../ApplicationConfiguration";

export function addNewPriceSheet(sheet: PriceSheet) {
	return axiosInterceptor.post(`${PATH}/pricesheets/`, sheet).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function updatePriceSheet(sheet: PriceSheet) {
	return axiosInterceptor.put(`${PATH}/pricesheets/${sheet.id}`, sheet).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function deletePriceSheet(sheet: PriceSheet) {
	return axiosInterceptor.delete(`${PATH}/pricesheets/${sheet.id}`).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPriceSheetById(id: string) {
	return axiosInterceptor.get(`${PATH}/pricesheets/${id}`).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPriceSheetsByLocation(selectedLocationId: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByLocationId`, {
		params: {
			locationId: selectedLocationId,
			page: page,
			size: size,
			sort: sort
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPriceSheetByDateAndLocation(month: number, year: number, locationId: string) {
	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYearAndLocationId`, {
		params: {
			month: month,
			year: year,
			locationId: locationId
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPriceSheetTaxAmount(modelSelectedDate: string, locationId: string, modelName: string, modelNumber: string) {
	var dateTokens = modelSelectedDate.split("/");
	var month: number = parseInt(dateTokens[0])-1;
	var year: number = parseInt(dateTokens[2]);

	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYearAndLocationId`, {
		params: {
			month: month,
			year: year,
			locationId: locationId
		}
	}).then(response => {
		//console.log(response);
		var priceSheet: PriceSheet = response.data;
		// Iterate through the response to find the Sales Tax amount.
		var salesTaxAmount: number = 0;
		var salesTaxCellIndex: number = 0;
		var done: boolean = false;

		if(!done) {
			priceSheet.seriesList.forEach(function(series) {
				var foundSalesTax: boolean = false;
				salesTaxCellIndex = 0;
				//console.log(series);

				// Iterate through the rows of the series to find the model.
				series.tableData.rows.forEach(function(row) {
					var foundModelName: boolean = false;
					var foundModelNumber: boolean = false;
					var salesTaxAmountSet: boolean = false;
		
					// Iterate through the cells of the row to find the model identifiers.
					row.cells.forEach(function(cell) {
						if(!done) {
							//console.log("cell column index: " + cell.columnIndex);
							//console.log("sales tax column index: " + salesTaxCellIndex);
							if(cell.displayValue.includes("Sales Tax")) {
								foundSalesTax = true;
								salesTaxCellIndex = cell.columnIndex;
							}
							if(cell.displayValue === modelName) {
								foundModelName = true;
							}
							if(cell.displayValue === modelNumber) {
								foundModelNumber = true;
							}

							// Found the model and the sales tax index.
							// Set the tax amount.
							if(foundSalesTax && cell.columnIndex === salesTaxCellIndex && foundModelNumber && foundModelName) {
								//console.log("setting tax amount...");
								//console.log(cell.displayValue.replace(/\$/g, ""));
								salesTaxAmount = parseFloat(cell.displayValue.replace(/\$/g, ""));
								salesTaxAmountSet = true;
							}

							// Everything we need detected at the right level in the data hierarchy.
							// Set the tax amount to return and set "done" to true to stop further processing.
							if(foundModelNumber && foundModelName && foundSalesTax && salesTaxAmountSet) {
								//console.log(cell.value + " - " + cell.displayValue + " : " + salesTaxCellIndex);
								//console.log("sales tax amount: " + salesTaxAmount);
								done = true;
							}
							
						}
					});
				});
			});
		}

        return Promise.resolve(salesTaxAmount);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getThisMonthsPriceSheetForLocation(locationId: string) {
	let todaysDate = new Date();
	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYearAndLocationId`, {
		params: {
			month: todaysDate.getMonth(),
			year: todaysDate.getFullYear(),
			locationId: locationId
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPreviousMonthsPriceSheetForLocation(locationId: string) {
	let todaysDate = new Date();
	let previousMonth = todaysDate.getMonth() - 1;
	let year = todaysDate.getFullYear();
	if(previousMonth - 1 < 0) {
		previousMonth = 12;
		year = year - 1;
	}
	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYearAndLocationId`, {
		params: {
			month: previousMonth,
			year: year,
			locationId: locationId
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getNextMonthsPriceSheetForLocation(locationId: string) {
	let todaysDate = new Date();
	let nextMonth = todaysDate.getMonth() + 1;
	let year = todaysDate.getFullYear();
	if(nextMonth - 1 > 11) {
		nextMonth = 1;
		year = year + 1;
	}

	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYearAndLocationId`, {
		params: {
			month: nextMonth,
			year: year,
			locationId: locationId
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getPriceSheetsForMonth(month: number, year: number) {
	return axiosInterceptor.get(`${PATH}/pricesheets/search/findByMonthAndYear`, {
		params: {
			month: month,
			year: year
		}
	}).then(response => {
        // console.log(response);
        return Promise.resolve(response);
    })
    .catch((error) => {
        console.log(error);
        return Promise.resolve(error.response);
	});
}

export function getChangesByLocationId(locationId: string, page: number, size: number, sort: string) {
	return axiosInterceptor.get(`${PATH}/changes/search/findByLocationId`, {
		params: {
			locationId: locationId,
			page: page,
			size: size,
			sort: sort
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

/***********Utility Functions ******** */

export function parseBedFromString(value: string) {
	if(value !== undefined) {
		let res = value.split("/");
		if(res[0] !== undefined) {
			return res[0].replace('BD', '');
		} else {
			return res[0];
		}

	} else {
		return "";
	}
	
	
}

export function parseBathFromString(value: string) {

	if(value !== undefined) {
		let res = value.split("/");
		if(res[1] !== undefined) {
			return res[1].replace('BA', '');
		} else {
			return res[0];
		}
	} else {
		return "";
	}
}

export function parseWidthFromString(value: string) {
	let whiteSpaceStrippedValue = value.trim();
	let res = whiteSpaceStrippedValue.split("x");
	return getInchesFromMeasurementString(res[0]);
}

export function parseLengthFromString(value: string) {
	let whiteSpaceStrippedValue = value.trim();
	let res = whiteSpaceStrippedValue.split("x");
	return getInchesFromMeasurementString(res[1]);
}

export function calculateHitchSize(value: string) {
	try {
		let width = parseWidthFromString(value);
		let length = parseLengthFromString(value);
		length = length + 48;
		let widthFeet = convertInchesMeasurementToFeet(width).toString();
		let lengthFeet = convertInchesMeasurementToFeet(length).toString();
		return widthFeet + " x " + lengthFeet;
	} catch(err) {
		return value + " (add 4ft to max length";
	}
}

function getInchesFromMeasurementString(value: string) {
	let res = value.split("'");
	return (parseInt(res[0]) * 12);
}

function convertInchesMeasurementToFeet(measurement: number) {
	let feet = Math.floor(measurement / 12);
	let inches = measurement % 12;
	return feet + "' " + inches + "\"";
}