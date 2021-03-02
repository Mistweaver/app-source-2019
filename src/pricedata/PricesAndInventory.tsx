import { useState } from "react";
import { checkIfDev } from "../auth/AccessControlFunctions";
import PriceDataPrimaryDisplay from "./data/PriceDataPrimaryDisplay";
import LegacyData from "./dev/LegacyData";
import EquationManager from "./equations/EquationManager";
import ExpiredDataComponent from "./expired/ExpiredDataComponent";
import ModelManager from "./models/ModelManager";
import VariableManager from "./variables/VariableManager";

export const PricesAndInventory = () => {
	const[display, setDisplay] = useState(1);

	function changeDisplay(event: { target: { value: string }}) {
		setDisplay(parseInt(event.target.value));
	}

	return(
		<div style={{padding: 15}}>
			<div style={{padding: 10, backgroundColor: '#3C4953', color: "#BAD2D7", display: 'flex', alignItems: 'center', marginBottom: 5}}>
				<select onChange={changeDisplay} style={{backgroundColor: 'transparent', border: 'none', color: "#BAD2D7", padding: 10, cursor: 'pointer' }}>
					<option value={1} style={{color: 'black'}}>Price Data</option>
					<option value={2} style={{color: 'black'}}>Models</option>
					<option value={3} style={{color: 'black'}}>Variables</option>
					<option value={4} style={{color: 'black'}}>Equations</option>
					{checkIfDev() && <option value={5} style={{color: 'black'}}>Dev Tools</option>}
					<option value={6} style={{color: 'black'}}>Expired Data</option>
				</select>
			</div>
			
			{display === 1 && <PriceDataPrimaryDisplay />}
			{display === 2 && <ModelManager />}
			{display === 3 && <VariableManager />}
			{display === 4 && <EquationManager />}
			{display === 5 && <LegacyData />}
			{display === 6 && <ExpiredDataComponent /> }
		</div>
	)
}