import { ViewColumn } from '@material-ui/icons';
import React from 'react';
import ToolbarButton from '../../components/buttons/ToolbarButton';
import CustomModal from '../../components/modal/CustomModal';
import { useModal } from '../../components/modal/useModal';
import { Column } from './Column';
import { ColumnEditor } from './ColumnEditor';

interface Props {
	columns: Column[];							// list of columns
	toggleColumn: (column: Column) => void;		// toggle the column visibility
	reload: () => void;							// reload the table when this is closed
}

export const TableColumnEditor = (props: Props) => {
	const { render, toggle } = useModal();

	function exit() {
		toggle();
		props.reload();
	}

	return(
		<>
			<ToolbarButton color="orange" tooltipText="Edit Model" onClick={toggle} icon={<ViewColumn />} />
			<CustomModal 
				close={exit}
				render={render}
				title="Select Table Columns"
			>
				<ColumnEditor
					columns={props.columns}
					toggleColumnVisibility={props.toggleColumn}
				/>
			</CustomModal>
		</>
	)
}

