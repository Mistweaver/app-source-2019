
export const ApplianceData = [
	{
		modelType: "PM",
		key: "amperage",
		name: "Amperage",
		type: "selection",
		options: ["30", "50", "100"],
		children: []
	},
	{
		modelType: "HUD",
		key: "amperage",
		name: "Amperage",
		type: "selection",
		options: ["50", "100", "150", "200"],
		children: []
	},
	{
		modelType: "",
		key: "gasService",
		name: "Gas service on home site to be",
		type: "selection",
		options: ["Natural", "LP Propane"],
		children: []
	},
	{
		modelType: "HUD",
		key: "acReady",
		name: "AC Ready",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	},
	{
		modelType: "HUD",
		key: "heatPumpReady",
		name: "Heat pump ready",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	},
	{
		modelType: "",
		key: "applianceColor", 
		name: "Appliance color",
		type: "selection",
		options:["Black", "White", "Silver Stainless Steel", "Black Stainless Steel", "N/A"],
		children: []
	},
	{
		modelType: "",
		key: "refrigerator",
		name: "Refrigerator",
		type: "selection",
		options: ["Yes", "Omit"],
		children: [{
			modelType: "",
			key: "refrigeratorSize",
			name: "Refrigerator size",
			type: "input",
			options: [],
			children: []
		}],
	},
	{
		modelType: "HUD",
		key: "iceMaker",
		name: "Ice maker",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	
	},
	{
		modelType: "HUD",
		key: "iceMakerPlumbingOnly",
		name: "Ice maker plumbing only",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	
	},
	{
		modelType: "HUD",
		key: "freezerPlug",
		name: "Freezer plug",
		options: ["Yes", "No"],
		type: "selection",
		children: [{
			modelType: "",
			key: "freezerPlugLocation",
			name: "Freezer plug location",
			type: "input",
			options: [],
			children: []
		}],
	},
	{
		modelType: "HUD",
		key: "dishwasher",
		name: "Dishwasher",
		type: "selection",
		options: ["Yes", "No", "Omit"],
		children: []
	},
	{
		modelType: "HUD",
		key: "dishwasherReady",
		name: "Dishwasher ready",
		options: ["Yes", "No"],
		type: "selection",
		children: [{
			modelType: "",
			key: "dishwasherDoorOption",
			name: "Dishwasher door option",
			type: "selection",
			options: ["With Door", "Without Door"],
			children: []
		}],
	},
	{
		modelType: "HUD",
		key: "garbageDisposal", 
		name: "Garbage disposal",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	},
	{
		modelType: "HUD",
		key: "garbageDisposalReady",
		name: "Garbage disposal ready",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	},
	{
		modelType: "HUD",
		key: "microwaveAboveStove", 
		name: "Microwave above stove",
		type: "selection",
		options: ["Yes", "No"],
		children:[]
	},
	{
		modelType: "HUD",
		key: "microwaveReady", 
		name: "Microwave ready",
		type: "selection",
		options: ["Yes", "No"],
		children: [{
			modelType: "",
			key: "microwaveLocation",
			name: "Microwave location",
			type: "input",
			options: [],
			children: []
		}]
	},
	
	{
		modelType: "",
		key: "range",
		name: "Range",
		type: "selection",
		options: ["Yes", "Omit"],
		children: [{
			modelType: "",
			key: "rangeType",
			name: "Range type",
			type: "selection",
			options: [ "Electric", "Gas"],
			children: []
		}]
	},
	
	{
		modelType: "",
		key: "rangeHookup",
		name: "Range hookup",
		type: "selection",
		options: ["Yes", "Omit"],
		children: [{
			modelType: "",
			key: "rangeHookupType",
			name: "Range hookup type",
			type: "selection",
			options: ["Electric", "Gas", "Both"],
			children: []
		}],
	},
	
	{
		modelType: "HUD",
		key: "washer",
		name: "Washer",
		type: "selection",
		options: ["Yes", "No"],
		children: []
	},
	{
		modelType: "HUD",
		key: "dryer",
		name: "Dryer",
		type: "selection",
		options: ["Yes", "No"],
		children: []

	},
	{
		modelType: "HUD",
		key: "dryerHookUp",
		name: "Dryer hookup",
		type: "selection",
		options: ["Yes", "Omit"],
		children: [{
			modelType: "",
			key: "dryerHookupType",
			name: "Dryer hookup type",
			type: "selection",
			options: ["Electric", "Gas", "Both"],
			children: []
		}]
	},
	{
		modelType: "",
		key: "waterHeater",
		name: "Water heater",
		type: "selection",
		options:[ "Electric", "Gas"],
		children: []
	},
	{
		modelType: "",
		key: "waterHeaterSize",
		name: "Water heater size",
		type: "input",
		options: [],
		children: []
	},
	{
		modelType: "",
		key: "furnace",
		name: "Furnace",
		type: "selection",
		options: ["Yes", "No", "Omit"],
		children: [{
			modelType: "",
			key: "furnaceType",
			name: "Furnace type",
			type: "selection",
			options:["Electric", "Gas", "Upflow", "Oil", "Omit with return air and cabinets", "Electric wall mounted"],
			children: []
		}]
	},
	
	{
		modelType: "HUD",
		key: "ductwork", 
		name: "Ductwork",
		type: "selection",
		options: ["Upper","Lower","Omit"],
		children: []
	},
	{
		
		modelType: "HUD",
		key: "fireplace",
		name: "Fireplace",
		type: "selection",
		options: ["Yes", "No", "Omit"],
		children: [{
			modelType: "",
			key: "fireplaceType",
			name: "Fireplace type",
			type: "selection",
			options: ["Electric", "Gas", "Wood"],
			children: []
		}],
	},
	
]