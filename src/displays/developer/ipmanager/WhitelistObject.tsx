import { BasicEntity } from "../../../objects/entity/BasicEntity"

export class WhitelistObject extends BasicEntity {
	ipAddress: string;
	ipv6Address: string;
	description: string;
	locationId: string;
}