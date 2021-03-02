import { Column } from "./Column";
/***
 * KEY
 * 
 * CORE -> Core data.  These are variables/equations that should always exist on price data.  They must be present to calculate 
 * new pricing
 * 
 * MODEL -> Properties inherent to the model itself.  You access the model object to get these
 * 
 * PRICEDATA -> Properties inherent to the price data.  These are basic fields for the price data
 */
export const BASE_COLUMNS: Column[] = [
	// default visible data
	{id: "1", header: "Name", key: "name", type: "PRICEDATA", visible: true},
	{id: "2", header: "Model No.", key: "modelNumber", type: "MODEL", visible: true},
	{id: "3", header: "Manufacturer", key: "factoryId", type: "MODEL", visible: true},
	{id: "4", header: "Type", key: "type", type: "MODEL", visible: true},
	{id: "5", header: "Width", key: "width", type: "MODEL", visible: true},
	{id: "6", header: "Length", key: "length", type: "MODEL", visible: true},
	{id: "7", header: "Created", key: "creationTime", type: "PRICEDATA", visible: true},
	{id: "8", header: "Active Date", key: "activeDate", type: "PRICEDATA", visible: true},
	{id: "9", header: "Expired Date", key: "expirationDate", type: "PRICEDATA", visible: true},

	// data that is not visible by default
	{id: "10", header: "Base Price", key: "[basePrice]", type: "CORE", visible: false},
	{id: "11", header: "Sq Ft", key: "[SQFT]", type: "CORE", visible: false},
	{id: "12", header: "Factory Total Cost", key: "[factoryTotalCost]", type: "CORE", visible: false},
	{id: "13", header: "Factory Direct Price", key: "[factoryDirectPrice]", type: "CORE", visible: true},
	{id: "14", header: "First Half Promo", key: "[firstHalfDiscountPrice]", type: "CORE", visible: false},
	{id: "15", header: "Second Half Promo", key: "[secondHalfDiscountPrice]", type: "CORE", visible: false},
	{id: "16", header: "MSRP", key: "[MSRP]", type: "CORE", visible: false},
	{id: "17", header: "Length 2", key: "[length2]", type: "MODEL", visible: false},
	{id: "18", header: "Series", key: "[seriesName]", type: "PRICEDATA", visible: false},
]