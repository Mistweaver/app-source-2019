import { BasicEntity } from "../entity/BasicEntity";

export class FileStoreDocument extends BasicEntity {
	contentType: string;
	deleted: boolean;
	fileUri: string;
	dateTimeLastModified: Date;
	fileName: string;
	fileSize: number;
	purchaseAgreementId: string;
}