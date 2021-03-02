import { ChangeOrderItem } from "../../../objects/changeorders/ChangeOrderItem";

export function calculateChangeOrderSubtotal(items: ChangeOrderItem[]) {
	let subTotal = 0;
	items.forEach(item => {
		subTotal += item.cost;
	});
	return subTotal;
}

export function calculateChangeOrderTotal(subTotal: number, taxes: number) {
	return (subTotal + taxes);
}