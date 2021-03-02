import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import StateFormManager from '../stateformmanager/StateFormManager';
import PromotionManager from '../promotions/PromotionManager';
import { MenuIcon } from '../../components/menuicon/MenuIcon';
import { Cached, CalendarToday, DeleteOutline, Description } from '@material-ui/icons';
import DeletedObjectManager from '../deletedobjectmanager/DeletedObjectManager';


export const AdminConsole = (props: {}) => {
	const [tab, setTab] = useState(0);

	function changeTab(value: any) {
		setTab(value);
	}


	return(
		<div style={{padding: 10}}>
			<Grid container spacing={2}>
				<Grid item xs={1}>
					<div style={{display: 'flex', flexDirection: 'column'}}>
						<MenuIcon optionName="State Forms" renderValue={0} select={changeTab}><Description style={{color: "red"}} /></MenuIcon>
						<MenuIcon optionName="Promotions" renderValue={1} select={changeTab}><CalendarToday style={{color: '#35e6b9'}} /></MenuIcon>
						<MenuIcon optionName="Deleted Object Manager" renderValue={2} select={changeTab}>
							<div style={{display: 'flex'}}>
								<DeleteOutline style={{color: 'red'}}/>
								<Cached style={{color: 'limegreen'}}/>
							</div>
						</MenuIcon>
					</div>

				</Grid>
				<Grid item xs={10}>
					{tab === 0 && <StateFormManager />}
					{tab === 1 && <PromotionManager />}
					{tab === 2 && <DeletedObjectManager />}
				</Grid>
			</Grid>
		</div>
		
	)
	
}

export default AdminConsole;