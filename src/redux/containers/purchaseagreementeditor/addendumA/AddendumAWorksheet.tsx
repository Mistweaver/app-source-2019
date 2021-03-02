import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../Store';
import { AddendumAItem } from '../../../../objects/purchaseagreement/addendumA/AddendumAItem';
import { Grid, Typography, Card, CardContent, TextField } from '@material-ui/core';
import { FormatNumberAsMoney } from '../../../../utilities/FormatNumberAsMoney';
import { addAddendumAItem, updateGenericInformation } from '../../../actions/AgreementEditorActions';
import { calculateInvoiceValues } from '../../../../utilities/InvoiceFunctions';
import AddendumAItemLine from './AddendumAItemLine';

interface AddendumAWorksheetProps {
	addendumAItems: AddendumAItem[];
	addendumANotes: string;
	taxes: number;
	addAddendumAItem: (items: AddendumAItem[], item: AddendumAItem) => void;
	updateGenericInformation: (targetedField: string, newValue: string) => void;

}

function mapStateToProps(state: StoreState) {
	return {
		addendumAItems: state.agreementeditor.addendumAItems,
		addendumANotes: state.agreementeditor.addendumANotes,
		taxes: state.agreementeditor.taxesAmount
	}
}

interface AddendumAWorksheetState {
	itemName: string;
	itemCost: string;
	itemLabel: string;

	newNote: string;

	maxInputLengthReached: boolean;
	displaySelectionSheet: boolean;

	// tracks where to keep input focus.  0 = item description, 1 = item cost
	inputFieldIndex: number;

	capsLockEngaged: boolean;
}

class AddendumAWorksheet extends React.Component<AddendumAWorksheetProps, AddendumAWorksheetState> {
	private itemDescriptionRef: React.RefObject<HTMLInputElement>;
	private itemCostRef: React.RefObject<HTMLInputElement>;
	private maxInputCharacterLength = 1024;

	constructor(props: AddendumAWorksheetProps) {
		super(props);
		this.state = {
			
			itemName: "",
			itemCost: "",
			itemLabel: "",

			newNote: "",
			maxInputLengthReached: false,
			displaySelectionSheet: false,

			capsLockEngaged: false,

			inputFieldIndex: 0,
		}

		this.itemDescriptionRef = React.createRef();
		this.itemCostRef = React.createRef();
		// this.addLineNote = this.addLineNote.bind(this);

		this.addItem = this.addItem.bind(this);
		this.itemCostChange = this.itemCostChange.bind(this);
		this.itemNameChange = this.itemNameChange.bind(this);
		this.handleKeyStroke = this.handleKeyStroke.bind(this);
		this.capsLockCheck = this.capsLockCheck.bind(this);
		this.setFocus = this.setFocus.bind(this);
		this.newNoteChange = this.newNoteChange.bind(this);

	}

	private handleKeyStroke(event: any) {
		const { inputFieldIndex } = this.state;

		// Check for capslock since these users are an affront to human literacy
		if(event.getModifierState("CapsLock") && !this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: true });
		} else if(!event.getModifierState("CapsLock") && this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: false });
		}

		switch(event.key) {
			case 'Enter': {
				if(inputFieldIndex === 0) {	// focus currently on item description
					// move focus to item cost
					this.setState({ inputFieldIndex: 1 });
					this.focusOnItemCost();
				} else if (inputFieldIndex === 1) {	// focus currently on item cost
					// add item, move focus back to item description
					this.setState({ inputFieldIndex: 0 });
					this.addItem();
					this.focusOnItemDescription();
				} else {
					// do nothing
				}
				break;
			}
			case 'Tab': {
				// console.log("Tab triggered");
				if(inputFieldIndex === 0) {	// focus currently on item description
					// move focus to item cost
					this.setState({ inputFieldIndex: 1 });
					// this.focusOnItemCost();
				} else if (inputFieldIndex === 1) {	// focus currently on item cost
					// add item, move focus back to item description
					this.setState({ inputFieldIndex: 0 });
					this.addItem();
					// this.focusOnItemDescription();
					// this.focusOnItemCost();
				} else {
					// do nothing
				}
				break;
			}
			default: {
				// this.focusTextInput();
				break;
			}
		}
	}

	private addItem() {
		// console.log("Adding item in worksheet");
		const { itemName, itemCost, itemLabel } = this.state;
		if(itemName !== "" && itemCost !== "") {
			if(itemCost === "PKG" || itemCost === "STD" || itemCost === "NC" || itemCost === "pkg" || itemCost === "std" || itemCost === "nc") {
				this.props.addAddendumAItem(this.props.addendumAItems, new AddendumAItem(itemName, 0, itemCost));
				this.setState({ 
					itemCost: "",
					itemName: "",
					itemLabel: ""
				});
			} else {
				if(!isNaN(parseFloat(itemCost))) {
					this.props.addAddendumAItem(this.props.addendumAItems, new AddendumAItem(itemName, parseFloat(itemCost), itemLabel));
					this.setState({ 
						itemCost: "",
						itemName: "",
						itemLabel: ""
					});
				}
			}
		}
	}

	private capsLockCheck(event: any) {
		// Check for capslock since these users are an affront to human literacy
		if(event.getModifierState("CapsLock") && !this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: true });
		} else if(!event.getModifierState("CapsLock") && this.state.capsLockEngaged) {
			this.setState({ capsLockEngaged: false });
		}
	}

	

	private itemCostChange(event: { target: { value: any}; }) {		
		this.setState({ itemCost: event.target.value });
	}

	private itemNameChange(event: { target: { value: string}; }) {
		if(event.target.value.length < this.maxInputCharacterLength && !this.state.capsLockEngaged) {
			this.setState({
				itemName: event.target.value,
			});
		}
		
	}

	private newNoteChange(event: { target: { value: string}; }) {
		if(!this.state.capsLockEngaged) {
			this.props.updateGenericInformation("addendumANotes", event.target.value);
		}
	}

	private focusOnItemDescription() {
		if(this.itemDescriptionRef.current !== null) {
			this.itemDescriptionRef.current.focus();
		}
	}

	private focusOnItemCost() {
		if(this.itemCostRef.current !== null) {
			this.itemCostRef.current.focus();
		}
	}

	private setFocus(focusItem: number) {
		this.setState({ inputFieldIndex: focusItem });
		if(focusItem === 0) {	// focus currently on item description
			this.setState({ inputFieldIndex: 0 });
			this.focusOnItemDescription();
		} else if (focusItem === 1) {	// focus currently on item cost
			this.setState({ inputFieldIndex: 1 });
			this.focusOnItemCost();
		}
	}

	public render() {
		const { addendumAItems, addendumANotes } = this.props;
		const { itemName, itemCost } = this.state;
		
		return(
			<>
				<Grid item xs={4}>
					<Card>
						<CardContent>
							<TextField
								id="outlined-name"
								label="Add Line Notes"
								name="notes"
								value={addendumANotes}
								onChange={this.newNoteChange}
								onKeyDown={this.capsLockCheck}
								multiline
								fullWidth
								rows={25}
								variant="outlined"
								// style={{marginRight: 10}}
								spellCheck
							/>
						</CardContent>
					</Card>
				</Grid>
				
				<Grid item xs={6}>
					<Card>
						<CardContent>
							<div style={{display: 'flex'}} onKeyDown={this.handleKeyStroke}>
								<div style={{display: 'flex', flexDirection: 'column', width: '60%'}}>
									<p style={{marginBottom: 5}}><b>Add New Item</b></p>
									<input ref={this.itemDescriptionRef} placeholder="Item Description" value={itemName} onChange={this.itemNameChange} onClick={() => this.setFocus(0)} />
									{
										itemName.length >= this.maxInputCharacterLength &&
										<span style={{color: 'red'}}>{"ERR: maximum character length reached (max length: " + this.maxInputCharacterLength + ")" }</span>
									}
								</div>
								<div style={{display: 'flex', flexDirection: 'column', marginLeft: 20, width: '40%'}}>
									<p style={{marginBottom: 5}}><b>New Item Retail</b></p>
									<span>
										<input ref={this.itemCostRef} placeholder="$" value={itemCost} onChange={this.itemCostChange} onClick={() => this.setFocus(1)}/>
									</span>
									<p style={{fontSize: 11}}><b>Enter a numeric value, PKG, or STD</b></p>
								</div>
								
							</div>
							{/*
								taxes === 0 &&
								<p style={{color: 'red', fontSize: 14, margin: 2}}>Reminder: make sure to calculate taxes on Page 1 when finished with Addendum A</p>
							*/}
							{
								this.state.capsLockEngaged &&
								<p style={{color: 'red', fontSize: 14, margin: 2}}>It appears you are trying to use CAPS LOCK.  Please stop.</p>
							}
						</CardContent>
					</Card>
					<Card style={{marginTop: 10}}>
						<CardContent>
							<div style={{display: 'flex', flexDirection: 'column'}}>

								<div style={{display: 'flex', borderBottom: '1px solid black'}}>
									<div style={{width: '60%', borderRight: '1px solid black', padding: 5}}>
										<Typography variant="body1">Addendum Items - Total: {FormatNumberAsMoney(calculateInvoiceValues().addendumATotal)}</Typography>
									</div>
									<div style={{width: '20%', padding: 5, borderRight: '1px solid black'}}>
										<Typography variant="body1">Retail</Typography>
									</div>
									<div style={{width: '20%', padding: 5}}>
										<Typography variant="body1">Actions</Typography>
									</div>
								</div>

								{
									addendumAItems.map((item, index) => (
										<AddendumAItemLine key={index} index={index} item={item}   />
										
										
									))
								}
							</div>
						</CardContent>
					</Card>
				</Grid>
			</>
		)
	}
}

export default connect(mapStateToProps, { addAddendumAItem, updateGenericInformation })(AddendumAWorksheet);