/****Main Displays****/

export class TableColumn {
	columnDef: string;
	header: string;
}

export const LEADSDISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name'},
	{ columnDef: 'lastName',  header: 'Last Name'},
	{ columnDef: 'emailAddress',  header: 'Email'},
	{ columnDef: 'phone', header: 'Phone'},
	{ columnDef: 'locationId',  header: 'Location'},
	{ columnDef: 'modificationTime',  header: 'Last Modified'},
	{ columnDef: 'creationTime',  header: 'Creation Date'},
	{ columnDef: 'status', header: 'Recent Activity'},
	{ columnDef: 'userId',  header: 'Sales Agent'}
];

export const USER_LEADS_DISPLAY = [
	{ columnDef: 'firstName',  header: 'First Name'},
	{ columnDef: 'lastName',  header: 'Last Name'},
	{ columnDef: 'emailAddress',  header: 'Email'},
	{ columnDef: 'phone', header: 'Phone'},
	{ columnDef: 'locationId',  header: 'Location'},
	{ columnDef: 'modificationTime',  header: 'Last Modified'},
	{ columnDef: 'creationTime',  header: 'Creation Date'},
	{ columnDef: 'status', header: 'Recent Activity'}
]

export const MASTERLEADSDISPLAY = [
	{ columnDef: 'emailAddress',  header: 'Email'},
	{ columnDef: 'phone', header: 'Phone'},
	{ columnDef: 'locationId',  header: 'Location'},
	{ columnDef: 'modificationTime',  header: 'Last Modified'},
	{ columnDef: 'creationTime',  header: 'Creation Date'},
	{ columnDef: 'status', header: 'Status'},
	{ columnDef: 'userId',  header: 'Sales Agent'}
];


export const PRICESHEETSDISPLAY = [
	{ columnDef: 'month', header: 'Month'},
	{ columnDef: 'year', header: 'Year'},
]

export const PURCHASE_AGREEMENT_DISPLAY = [
	{ columnDef: 'buyer1', header: 'Buyer'},
	{ columnDef: 'salesPersonId', header: 'Sales Rep'},
	{ columnDef: 'date', header: 'Date'},
	{ columnDef: 'locationId', header: 'Location'},
	{ columnDef: 'deliveryState', header: 'Delivery State'},
	{ columnDef: 'makeAndModel', header: 'Make and Model'},
	{ columnDef: 'total', header: 'Total'},
	{ columnDef: 'status', header: 'Status'}
]

export const PURCHASE_AGREEMENT_ADMIN_DISPLAY = [
	{ columnDef: 'buyer1', header: 'Buyer'},
	{ columnDef: 'salesPersonId', header: 'Sales Rep'},
	{ columnDef: 'date', header: 'Date'},
	{ columnDef: 'locationId', header: 'Location'},
	{ columnDef: 'deliveryState', header: 'Delivery State'},
	{ columnDef: 'total', header: 'Total'},
	{ columnDef: 'status', header: 'Status'}
]

export const PURCHASE_AGREEMENT_ACCOUNTING_DISPLAY = [
	{ columnDef: 'buyer1', header: 'Buyer'},
	{ columnDef: 'creationTime',  header: 'Creation Date'},
	{ columnDef: 'modificationTime',  header: 'Last Modified'},
	{ columnDef: 'locationId', header: 'Location'},
	{ columnDef: 'deliveryState', header: 'Delivery State'},
	{ columnDef: 'total', header: 'Total'},
	{ columnDef: 'status', header: 'Status'}
]


export const CHANGE_ORDER_ACCOUNTING_DISPLAY = [
	{ columnDef: 'buyer1', header: 'Buyer'},
	{ columnDef: 'creationTime',  header: 'Creation Date'},
	{ columnDef: 'modificationTime',  header: 'Last Modified'},
	{ columnDef: 'locationId', header: 'Location'},
	{ columnDef: 'deliveryState', header: 'Delivery State'},
	{ columnDef: 'total', header: 'Total'},
	{ columnDef: 'status', header: 'Status'}
]


export const CHANGES_DISPLAY = [
	{ columnDef: 'creationTime',  header: 'Change Date'},
	{ columnDef: 'description', header: 'Description'}
]


export const SALES_OFFICE_DISPLAY = [
	{ columnDef: 'officeName', header: 'Office'},
	{ columnDef: 'officeState', header: 'State'},
	{ columnDef: 'officePhoneNumber', header: 'Phone #'},
	{ columnDef: 'clientConsultantId', header: 'Client Consultant ID'},
	{ columnDef: 'avalaraId', header: 'Avalara ID'},
	{ columnDef: 'locationCode', header: 'Avalara Location Code'}
]

export const FACTORY_DISPLAY = [
	{ columnDef: 'uniqueName', header: 'Name'},
	{ columnDef: 'manufacturerName', header: 'Manufacturer'},
	{ columnDef: 'displayName', header: 'Display Name'},
	{ columnDef: 'city', header: 'City'},
	{ columnDef: 'state', header: 'State'}
]

/****Admin Displays****/
export const USERSDISPLAY = [
	{ columnDef: 'name',  header: 'Name'},
	{ columnDef: 'location',  header: 'Location'}
];

export const EMAILTEMPLATESDISPLAY = [
	{ columnDef: 'label',  header: 'Label'},
	{ columnDef: 'website',  header: 'Website'},
	{ columnDef: 'from',  header: 'From'},
	{ columnDef: 'leadSourceId',  header: 'LeadSourceId'}
];










