import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, LinearProgress } from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getPriceSheetsByLocation } from '../../services/PriceSheetServices';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { PriceSheet } from '../../objects/pricesheet/PriceSheet';
import { PRICESHEETSDISPLAY } from '../../data/tablesettings';
import { ConvertMonthIntegerToString } from '../../utilities/ConvertMonthIntegerToString';
import { validateHTMLResponse } from '../../services/HttpResponseChecker';

interface SelectPriceSheetModalProps {
	locationId: string;
	open: boolean;
	onClose: () => void;
	selectPriceSheet: (priceSheet: PriceSheet) => void;
}

interface SelectPriceSheetModalState {
	// refresh: number;
	page: number;
	size: number;
	sort: string;
	currentSortDirection: string;
	totalPages: number;
	totalObjects: number;
	loading: boolean;
	priceSheets: PriceSheet[];
	
	sheet: PriceSheet;

}

class SelectPriceSheetModal extends React.Component<SelectPriceSheetModalProps, SelectPriceSheetModalState> {
	constructor(props: SelectPriceSheetModalProps) {
		super(props);
		this.state = {
			page: 0,
			size: 20,
			sort: "",
			currentSortDirection: "",
			totalPages: 0,
			totalObjects: 0,
			loading: false,
			priceSheets: [],
			sheet: new PriceSheet()
		}

		this.handleNextPage = this.handleNextPage.bind(this);
		this.handleFirstPage = this.handleFirstPage.bind(this);
		this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.handleLastPage = this.handleLastPage.bind(this);
		this.setSort = this.setSort.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() { 
		this.loadLocationPriceSheets(this.state.page, this.state.size, this.state.sort);
		// this.checkIfNextMonthSheetExists();
	}
	componentDidUpdate(prevProps: SelectPriceSheetModalProps) {
		if(prevProps !== this.props) {
			this.loadLocationPriceSheets(this.state.page, this.state.size, this.state.sort);
			// this.checkIfNextMonthSheetExists();
		}
	}

	private handleChange(event: { target: { name: string, value: string }}) {
		const { name, value } = event.target;
		//@ts-ignore
		this.setState({
			[name]: value
		})
	}

	private loadLocationPriceSheets(page: number, size: number, sort: string) {
		this.setState({ loading: true });
		getPriceSheetsByLocation(this.props.locationId, this.state.page, this.state.size, this.state.sort).then(res => {
			if(validateHTMLResponse(res)) {
				this.setState({
					priceSheets: res.data._embedded.pricesheets,
					totalObjects: res.data.page.totalElements,
					totalPages: res.data.page.totalPages,
					loading: false
				});
			}
		});
	}

	public handleNextPage(totalPages: number) {
		const { page, size, sort } = this.state;
		if(page + 1 < totalPages) {
			let currentPage = page;
			currentPage += 1;
			this.setState({ page: currentPage });
			this.loadLocationPriceSheets(currentPage, size, sort);
		}
	}

	public handleLastPage(totalPages: number) {
		const { page, size, sort } = this.state;
		let currentPage = page;
		currentPage = totalPages - 1;
		this.setState({ page: currentPage });
		this.loadLocationPriceSheets(currentPage, size, sort);
	}

	public handleFirstPage() {
		const { size, sort } = this.state;
		this.setState({ page: 0 });
		this.loadLocationPriceSheets(0, size, sort);
	}

	public handlePreviousPage() {
		const { page, size, sort } = this.state;
		if(page - 1 >= 0) {
			let currentPage = page;
			currentPage -= 1;
			this.setState({ page: currentPage });
			this.loadLocationPriceSheets(currentPage, size, sort);
		}
	}

	public setSort(sort: string) {
		const { size, currentSortDirection } = this.state;
		
		switch(currentSortDirection) {
			case "": {
				sort = sort + ",asc";
				this.setState({
					currentSortDirection: "asc",
					sort: sort
				});
				break;
			}
			case "asc": {
				sort = sort + ",desc";
				this.setState({
					currentSortDirection: "desc",
					sort: sort
				});
				break;
			}
			case "desc": {
				sort = "";
				this.setState({
					currentSortDirection: "",
					sort: sort
				});
				break;
			}
		}
		this.loadLocationPriceSheets(0, size, sort);
	}

	public renderRowCells(object: any) {
		let cells: any[] = [];
		PRICESHEETSDISPLAY.forEach(header=> {
			if(header.columnDef === 'modificationTime') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{(new Date(object[header.columnDef])).toLocaleString()}</td>
				)
			} else if(header.columnDef === 'creationTime') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{(new Date(object[header.columnDef])).toLocaleDateString()}</td>
				)
			} else if(header.columnDef === 'stateId') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			} else if(header.columnDef === 'userId') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			} else if(header.columnDef === 'month') {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{ConvertMonthIntegerToString(object[header.columnDef])}</td>
				)
			} else {
				cells.push(
					//@ts-ignore
					<td key={header.columnDef}>{object[header.columnDef]}</td>
				)
			}
		})
		return cells;
	}

	public handleSelectChange(event: { target: { value: string; }; }) {
		const { page, sort } = this.state;
		this.loadLocationPriceSheets(page, parseInt(event.target.value, 10), sort);
		this.setState({ size: parseInt(event.target.value, 10) })
	}

	public selectPriceSheet(priceSheet: PriceSheet) {
		this.props.selectPriceSheet(priceSheet);
		this.props.onClose();
	}

	public render() {
		const { open, onClose } = this.props;
		const { loading, priceSheets, size, page, totalObjects, totalPages,  } = this.state;
		return(
			<Dialog
                    open={open}
                    onClose={onClose}
					aria-labelledby="form-dialog-title"
					maxWidth="sm"
					fullWidth={true}
                >
                    <DialogTitle id="simple-dialog-title">Select Price Sheet</DialogTitle>
					<DialogContent>
						<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10}}>	
							<TextField
								select
								label="Show"
								type="number"
								value={size}
								onChange={this.handleSelectChange}
								margin="none"
								name="show"
								style={{minWidth: '100px', marginRight: 15}}
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
								<MenuItem value={100}>100</MenuItem>
							</TextField>
						</div>
						{
							loading &&
							<div style={{padding: 5}}>
								<LinearProgress />
							</div>
						}
						<div>
							{
								priceSheets.length === 0 ?
									<div style={{padding: 5, textAlign: 'center', border: '2px solid black', marginTop: 10}}>
										<span><ReportIcon style={{color: 'red'}} /> There don't appear to be any price sheets for this location</span>
									</div>
								:
								<table style={{width: '100%'}}>
									<thead>
										<tr>
											{
												PRICESHEETSDISPLAY.map(header => (
													<th key={header.columnDef}  style={{cursor: 'pointer', textAlign: 'left'}} onClick={() => this.setSort(header.columnDef)}>{header.header}</th>
												))
											}
											<th style={{width: '60px', textAlign: 'left'}}>Open</th>
										</tr>
									</thead>
									<tbody>
										{
											priceSheets.map((object, index) => (
												<tr key={index} >
													{this.renderRowCells(object)}
													<td><OpenInNewIcon onClick={() => this.selectPriceSheet(object)} style={{color: 'green', cursor: "pointer"}} /></td>
												</tr>
											))
										}

									</tbody>
								</table>

							}
						</div>
						<div style={{display: 'flex', justifyContent: 'space-between', borderTop: '1px solid grey', marginTop: 10}}>	
							<span style={{marginTop: 'auto', marginBottom: 'auto'}}>Page {page + 1} of {totalPages} ({totalObjects} total sheets)</span>
							<div style={{textAlign: 'center', padding: '10px'}}>
								<Button variant="contained" onClick={this.handleFirstPage}><FirstPageIcon /></Button>
								<Button variant="contained" onClick={this.handlePreviousPage}><ChevronLeftIcon /></Button>
								<Button variant="contained" onClick={() => this.handleNextPage(totalPages)}><ChevronRightIcon /></Button>
								<Button variant="contained" onClick={() => this.handleLastPage(totalPages)}><LastPageIcon /></Button>
							</div>
						</div>
					</DialogContent>
					<DialogActions style={{justifyContent: 'space-between'}}>
						<Button onClick={onClose} color="default">
							Close
						</Button>
                    </DialogActions>
				</Dialog>
		)
	}
}

export default SelectPriceSheetModal;