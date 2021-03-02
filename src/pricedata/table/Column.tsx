
type COLUMN_TYPE = "EQN" | "VAR" | "CORE" | "MODEL" | "PRICEDATA";

export class Column {
	id: string;
	header: string;
	key: string;
	type: COLUMN_TYPE;
	visible: boolean;

	constructor(_id: string, _key: string, _header: string, _type: COLUMN_TYPE, _visible: boolean) {
		this.id = _id;
		this.header = _header;
		this.key = _key;
		this.type = _type;
		this.visible = _visible;
	}
}