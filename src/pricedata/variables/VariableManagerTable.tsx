import React from 'react';

import { LinearProgress } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";
import { VariableDataPackage } from './objects/VariableDataPackage';

interface Props {
	// data
    data: VariableDataPackage[];
    loading: boolean;
	// functions
	// viewData: (priceData: PriceData) => void;
	// addData: (priceData: PriceData) => void;
	// removeData: (priceData: PriceData) => void;
	// selectAll: () => void;
	// clearSelection: () => void;
	// reload: () => void;
}

const VariableManagerTable = (props: Props) => {
    if(props.loading) {
        return(
            <div style={{padding: 15, marginTop: 10}}>
                <LinearProgress />
            </div>
        )
    } else {
        if(props.data.length === 0) {
            return null;
        } else {
            return(
                <div style={{maxHeight: '65vh', overflow: 'auto', backgroundColor: "rgb(231, 231, 231)"}}>
                    <table style={{width: '100%', fontSize: '10pt', borderSpacing: 0}}>
                        <thead>
                            <tr style={{whiteSpace: 'nowrap', fontSize: '9pt', textAlign: 'left'}}>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}></th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Location</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Status</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Name</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Model No.</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Manufacturer</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Type</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>WxL</th>
                                <th style={{position: 'sticky', top: 0, zIndex: 2, backgroundColor: "rgb(231, 231, 231)", padding: '5px 0px'}}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            props.data.map((row, index) => (
                                <tr key={index}>
                                    <td><CheckBox /></td>
                                    <td>{row.salesOffice.officeName}</td>
                                    <td>{row.priceData.status}</td>
                                    <td>{row.priceData.name}</td>
                                    <td>{row.priceData.model.modelNumber}</td>
                                    <td>{row.priceData.model.factoryId}</td>
                                    <td>{row.priceData.model.type}</td>
                                    <td>{row.priceData.model.width + "x" + row.priceData.model.length1}</td>
                                    <td><b>{row.variable.value}</b></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default VariableManagerTable;